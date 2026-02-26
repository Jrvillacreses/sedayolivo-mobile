'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';

/**
 * Fallback Hero component with CSS gradient animation
 * when frames are not available
 */
export default function HeroFallback() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [currentProgress, setCurrentProgress] = useState(0);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start start', 'end end'],
    });

    useEffect(() => {
        const unsubscribe = scrollYProgress.on('change', (progress) => {
            setCurrentProgress(progress);
        });
        return () => unsubscribe();
    }, [scrollYProgress]);

    // Transform values
    const santoriniOpacity = useTransform(scrollYProgress, [0, 0.3, 0.5], [1, 0.5, 0]);
    const tokyoOpacity = useTransform(scrollYProgress, [0.2, 0.5, 0.8], [0, 1, 1]);
    const glowIntensity = useTransform(scrollYProgress, [0.3, 0.7], [0, 1]);
    const scale = useTransform(scrollYProgress, [0, 1], [1.1, 1]);

    const scrollToSection = (sectionId: string) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    // Overlay ranges
    const showIntro = currentProgress >= 0 && currentProgress <= 0.15;
    const showConcept = currentProgress >= 0.25 && currentProgress <= 0.45;
    const showExperience = currentProgress >= 0.55 && currentProgress <= 0.75;
    const showCTA = currentProgress >= 0.85;

    return (
        <div
            ref={containerRef}
            className="relative"
            style={{ height: '600vh' }}
        >
            <div className="sticky top-0 h-screen w-full overflow-hidden">
                {/* Base layer - Santorini */}
                <motion.div
                    className="absolute inset-0"
                    style={{ opacity: santoriniOpacity, scale }}
                >
                    <div className="absolute inset-0 bg-gradient-to-b from-santorini-300 via-santorini-500 to-santorini-700" />
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_transparent_0%,_rgba(10,10,15,0.3)_100%)]" />

                    {/* Sun effect */}
                    <div className="absolute top-[20%] left-1/2 -translate-x-1/2 w-32 h-32 md:w-48 md:h-48 rounded-full bg-gradient-radial from-yellow-200 via-orange-300 to-transparent blur-2xl opacity-80" />
                </motion.div>

                {/* Tokyo layer */}
                <motion.div
                    className="absolute inset-0"
                    style={{ opacity: tokyoOpacity }}
                >
                    <div className="absolute inset-0 bg-gradient-to-b from-brand-navy via-brand-dark to-brand-darker" />

                    {/* Neon grid */}
                    <div
                        className="absolute inset-0 opacity-20"
                        style={{
                            backgroundImage: `
                linear-gradient(rgba(255,0,255,0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255,0,255,0.1) 1px, transparent 1px)
              `,
                            backgroundSize: '50px 50px',
                        }}
                    />

                    {/* Neon glow effects */}
                    <motion.div
                        className="absolute top-1/4 left-1/4 w-64 h-64 bg-neon-magenta/30 rounded-full blur-[100px]"
                        style={{ opacity: glowIntensity }}
                    />
                    <motion.div
                        className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-neon-cyan/30 rounded-full blur-[100px]"
                        style={{ opacity: glowIntensity }}
                    />
                    <motion.div
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-neon-pink/20 rounded-full blur-[120px]"
                        style={{ opacity: glowIntensity }}
                    />
                </motion.div>

                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/50 pointer-events-none" />

                {/* Content overlays */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    {/* Intro */}
                    {showIntro && (
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="text-center space-y-6 px-4 pointer-events-auto"
                        >
                            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight">
                                <span className="gradient-text">SEDA</span>
                                <span className="text-white"> & </span>
                                <span className="gradient-text-warm">OLIVO</span>
                            </h1>
                            <p className="text-xl md:text-2xl text-white/80 font-light">
                                Donde el Sol se encuentra con el Dragón.
                            </p>
                            <button
                                onClick={() => scrollToSection('menu')}
                                className="btn-secondary text-sm mt-8"
                            >
                                Explorar menú ↓
                            </button>
                        </motion.div>
                    )}

                    {/* Concept */}
                    {showConcept && (
                        <motion.div
                            initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
                            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                            className="text-center space-y-4 px-4 max-w-3xl pointer-events-auto"
                        >
                            <h2 className="text-3xl md:text-5xl font-bold text-white">
                                Tapas para compartir.
                                <br />
                                <span className="text-glow-cyan">Técnica japonesa.</span>
                                <br />
                                Alma mediterránea.
                            </h2>
                            <p className="text-lg text-white/60 font-light">
                                Sabores limpios, contrastes precisos, ambiente eléctrico.
                            </p>
                        </motion.div>
                    )}

                    {/* Experience */}
                    {showExperience && (
                        <motion.div
                            initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
                            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                            className="text-center space-y-4 px-4 max-w-3xl pointer-events-auto"
                        >
                            <h2 className="text-3xl md:text-5xl font-bold text-white">
                                De cita a celebración:
                                <br />
                                <span className="text-glow">un lugar para venir con ganas.</span>
                            </h2>
                            <p className="text-lg text-white/60 font-light">
                                Cócteles, luz azul, neón magenta y platos firma.
                            </p>
                        </motion.div>
                    )}

                    {/* CTA */}
                    {showCTA && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="text-center space-y-6 px-4 pointer-events-auto"
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
                    )}
                </div>

                {/* Scroll indicator */}
                {currentProgress < 0.1 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/40"
                    >
                        <motion.div
                            animate={{ y: [0, 10, 0] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="flex flex-col items-center gap-2"
                        >
                            <span className="text-xs uppercase tracking-widest">Scroll</span>
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                            </svg>
                        </motion.div>
                    </motion.div>
                )}
            </div>

            {/* Sticky CTA for mobile */}
            <motion.div
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
