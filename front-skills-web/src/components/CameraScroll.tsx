'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';

interface OverlayContent {
    range: [number, number];
    content: React.ReactNode;
}

interface CameraScrollProps {
    className?: string;
}

export default function CameraScroll({ className = '' }: CameraScrollProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const imagesRef = useRef<HTMLImageElement[]>([]);
    const frameIndexRef = useRef(0);
    const rafIdRef = useRef<number | null>(null);

    const [isLoading, setIsLoading] = useState(true);
    const [loadProgress, setLoadProgress] = useState(0);
    const [error, setError] = useState<string | null>(null);
    const [totalFrames, setTotalFrames] = useState(0);
    const [currentProgress, setCurrentProgress] = useState(0);

    // Use global window scroll to ensure animation plays at the very top
    const { scrollY } = useScroll();
    // Map scroll pixels [0, 600] to progress [0, 1]
    const scrollYProgress = useTransform(scrollY, [0, 600], [0, 1]);

    // Load manifest and preload images
    useEffect(() => {
        let isMounted = true;

        async function loadFrames() {
            try {
                // Fetch manifest with timestamp to prevent caching
                const response = await fetch(`/frames/manifest.json?t=${Date.now()}`);

                if (!response.ok) {
                    throw new Error('Falta generar manifest de frames. Ejecuta: npm run predev o npm run prebuild');
                }

                const manifest: string[] = await response.json();

                if (manifest.length === 0) {
                    throw new Error('No hay frames en el manifest. Añade imágenes a /frames/');
                }

                if (!isMounted) return;
                console.log(`🎬 Cargando ${manifest.length} frames...`);
                setTotalFrames(manifest.length);

                // Preload all images
                const loadedImages: HTMLImageElement[] = [];
                let loadedCount = 0;

                await Promise.all(
                    manifest.map((src, index) => {
                        return new Promise<void>((resolve, reject) => {
                            const img = new Image();
                            img.onload = () => {
                                loadedImages[index] = img;
                                loadedCount++;
                                if (isMounted) {
                                    setLoadProgress(Math.round((loadedCount / manifest.length) * 100));
                                }
                                resolve();
                            };
                            img.onerror = () => {
                                console.warn(`Failed to load frame: ${src}`);
                                resolve(); // Continue with other frames
                            };
                            img.src = src;
                        });
                    })
                );

                if (!isMounted) return;

                // Filter out undefined (failed loads)
                imagesRef.current = loadedImages.filter(Boolean);

                if (imagesRef.current.length === 0) {
                    throw new Error('No se pudieron cargar los frames');
                }

                setTotalFrames(imagesRef.current.length);
                setIsLoading(false);

                // Draw first frame
                drawFrame(0);

            } catch (err) {
                if (isMounted) {
                    setError(err instanceof Error ? err.message : 'Error cargando frames');
                    setIsLoading(false);
                }
            }
        }

        loadFrames();

        return () => {
            isMounted = false;
            if (rafIdRef.current) {
                cancelAnimationFrame(rafIdRef.current);
            }
        };
    }, []);

    // Draw frame on canvas with "contain" mode
    const drawFrame = useCallback((index: number) => {
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext('2d');
        const images = imagesRef.current;

        if (!canvas || !ctx || !images.length) return;

        const img = images[Math.min(index, images.length - 1)];
        if (!img) return;

        // Get device pixel ratio with mobile cap
        const isMobile = window.innerWidth <= 768;
        const dpr = Math.min(window.devicePixelRatio || 1, isMobile ? 2 : 3);

        // Set canvas size
        const rect = canvas.getBoundingClientRect();
        canvas.width = rect.width * dpr;
        canvas.height = rect.height * dpr;
        ctx.scale(dpr, dpr);

        // Clear canvas
        ctx.clearRect(0, 0, rect.width, rect.height);

        // Calculate "cover" dimensions (fill screen)
        const scale = Math.max(rect.width / img.width, rect.height / img.height);

        const drawWidth = img.width * scale;
        const drawHeight = img.height * scale;

        const drawX = (rect.width - drawWidth) / 2;
        const drawY = (rect.height - drawHeight) / 2;

        ctx.drawImage(img, drawX, drawY, drawWidth, drawHeight);
    }, []);



    // Handle scroll and update frame
    useEffect(() => {
        if (isLoading || error) return;

        const unsubscribe = scrollYProgress.on('change', (progress) => {
            // Clamp progress and calculate frame index to use ALL frames
            const clampedProgress = Math.min(Math.max(progress, 0), 1);
            const frameIndex = Math.min(
                Math.floor(clampedProgress * totalFrames),
                totalFrames - 1
            );

            // Only redraw if frame changed
            if (frameIndex !== frameIndexRef.current) {
                frameIndexRef.current = frameIndex;

                // Use RAF for smooth rendering
                if (rafIdRef.current) {
                    cancelAnimationFrame(rafIdRef.current);
                }

                rafIdRef.current = requestAnimationFrame(() => {
                    drawFrame(frameIndex);
                });
            }

            setCurrentProgress(progress);
        });

        return () => {
            unsubscribe();
            if (rafIdRef.current) {
                cancelAnimationFrame(rafIdRef.current);
            }
        };
    }, [isLoading, error, totalFrames, scrollYProgress, drawFrame]);

    // Handle window resize
    useEffect(() => {
        const handleResize = () => {
            if (!isLoading && !error) {
                drawFrame(frameIndexRef.current);
            }
        };

        window.addEventListener('resize', handleResize, { passive: true });
        return () => window.removeEventListener('resize', handleResize);
    }, [isLoading, error, drawFrame]);

    // Scroll to section helper
    const scrollToSection = (sectionId: string) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    // Overlay content based on scroll progress
    const overlays: OverlayContent[] = [
        {
            range: [0, 0.15],
            content: (
                <div className="text-center space-y-6 px-4">
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.6 }}
                        className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight"
                    >
                        <span className="gradient-text">SEDA</span>
                        <span className="text-white"> & </span>
                        <span className="gradient-text-warm">OLIVO</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-xl md:text-2xl text-white/80 font-light"
                    >
                        Donde el Sol se encuentra con el Dragón.
                    </motion.p>

                    <motion.button
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.4, delay: 0.4 }}
                        onClick={() => scrollToSection('menu')}
                        className="btn-secondary text-sm mt-8"
                    >
                        Explorar menú ↓
                    </motion.button>
                </div>
            ),
        },
        {
            range: [0.25, 0.45],
            content: (
                <div className="text-center space-y-4 px-4 max-w-3xl">
                    <motion.h2
                        initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
                        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                        exit={{ opacity: 0, y: -20, filter: 'blur(10px)' }}
                        transition={{ duration: 0.5 }}
                        className="text-3xl md:text-5xl font-bold text-white"
                    >
                        Tapas para compartir.
                        <br />
                        <span className="text-glow-cyan">Técnica japonesa.</span>
                        <br />
                        Alma mediterránea.
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.4, delay: 0.3 }}
                        className="text-lg text-white/60 font-light"
                    >
                        Sabores limpios, contrastes precisos, ambiente eléctrico.
                    </motion.p>
                </div>
            ),
        },
        {
            range: [0.55, 0.75],
            content: (
                <div className="text-center space-y-4 px-4 max-w-3xl">
                    <motion.h2
                        initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
                        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                        exit={{ opacity: 0, y: -20, filter: 'blur(10px)' }}
                        transition={{ duration: 0.5 }}
                        className="text-3xl md:text-5xl font-bold text-white"
                    >
                        De cita a celebración:
                        <br />
                        <span className="text-glow">un lugar para venir con ganas.</span>
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.4, delay: 0.3 }}
                        className="text-lg text-white/60 font-light"
                    >
                        Cócteles, luz azul, neón magenta y platos firma.
                    </motion.p>
                </div>
            ),
        },
        {
            range: [0.85, 1],
            content: (
                <div className="text-center space-y-6 px-4">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.5 }}
                        className="space-y-6"
                    >
                        <button
                            onClick={() => scrollToSection('reservas')}
                            className="btn-primary text-lg px-10 py-5 animate-glow-pulse"
                        >
                            <span>Reservar mesa</span>
                        </button>

                        <div>
                            <button
                                onClick={() => scrollToSection('menu')}
                                className="btn-secondary"
                            >
                                Ver carta
                            </button>
                        </div>
                    </motion.div>
                </div>
            ),
        },
    ];

    // Loading screen
    if (isLoading) {
        return (
            <div className={`h-screen flex items-center justify-center bg-brand-darker ${className}`}>
                <div className="text-center space-y-6">
                    <div className="w-20 h-20 mx-auto relative">
                        <div className="absolute inset-0 rounded-full border-4 border-white/10"></div>
                        <div
                            className="absolute inset-0 rounded-full border-4 border-transparent border-t-neon-magenta border-r-neon-cyan animate-spin"
                            style={{ animationDuration: '1s' }}
                        ></div>
                    </div>

                    <div className="space-y-2">
                        <p className="text-white/60 text-sm">Cargando experiencia...</p>
                        <p className="text-2xl font-bold gradient-text">{loadProgress}%</p>
                    </div>

                    <div className="w-48 h-1 mx-auto bg-white/10 rounded-full overflow-hidden">
                        <motion.div
                            className="h-full bg-gradient-neon rounded-full"
                            initial={{ width: 0 }}
                            animate={{ width: `${loadProgress}%` }}
                            transition={{ duration: 0.3 }}
                        />
                    </div>
                </div>
            </div>
        );
    }

    // Error screen
    if (error) {
        return (
            <div className={`h-screen flex items-center justify-center bg-brand-darker ${className}`}>
                <div className="text-center space-y-4 glass p-8 rounded-2xl max-w-md mx-4">
                    <div className="text-4xl">⚠️</div>
                    <h2 className="text-xl font-bold text-white">Error de carga</h2>
                    <p className="text-white/60 text-sm">{error}</p>
                    <button
                        onClick={() => window.location.reload()}
                        className="btn-secondary text-sm"
                    >
                        Reintentar
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div
            ref={containerRef}
            className={`relative ${className}`}
            style={{ height: '150vh' }}
        >
            {/* Sticky canvas container */}
            <div className="sticky top-0 h-screen w-full overflow-hidden">
                <canvas
                    ref={canvasRef}
                    className="absolute inset-0 w-full h-full"
                    style={{ background: '#0a0a0f' }}
                />

                {/* Dark overlay gradient for text readability */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60 pointer-events-none" />

                {/* Overlay content */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <AnimatePresence mode="wait">
                        {overlays.map((overlay, index) => {
                            const [start, end] = overlay.range;
                            const isVisible = currentProgress >= start && currentProgress <= end;

                            if (!isVisible) return null;

                            return (
                                <motion.div
                                    key={index}
                                    className="pointer-events-auto"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.4 }}
                                >
                                    {overlay.content}
                                </motion.div>
                            );
                        })}
                    </AnimatePresence>
                </div>

                {/* Scroll indicator - only show at beginning */}
                <AnimatePresence>
                    {currentProgress < 0.1 && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/40"
                        >
                            <motion.div
                                animate={{ y: [0, 10, 0] }}
                                transition={{ duration: 2, repeat: Infinity }}
                                className="flex flex-col items-center gap-2"
                            >
                                <span className="text-xs uppercase tracking-widest">Scroll</span>
                                <svg
                                    className="w-5 h-5"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M19 14l-7 7m0 0l-7-7m7 7V3"
                                    />
                                </svg>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Sticky CTA for mobile - always accessible */}
            <motion.div
                initial={{ y: 100, opacity: 0 }}
                animate={{
                    y: currentProgress > 0.2 && currentProgress < 0.85 ? 0 : 100,
                    opacity: currentProgress > 0.2 && currentProgress < 0.85 ? 1 : 0
                }}
                className="fixed bottom-4 right-4 z-50 md:hidden"
            >
                <button
                    onClick={() => scrollToSection('reservas')}
                    className="px-4 py-3 bg-neon-magenta/90 backdrop-blur-sm text-white text-sm font-semibold rounded-full shadow-neon"
                >
                    Reservar
                </button>
            </motion.div>
        </div>
    );
}
