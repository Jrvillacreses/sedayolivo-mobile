'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';

const galleryItems = [
    {
        id: 1,
        title: 'Ambiente Neon',
        category: 'Ambiente',
        aspectRatio: 'aspect-[4/5]',
    },
    {
        id: 2,
        title: 'Tataki Signature',
        category: 'Platos',
        aspectRatio: 'aspect-[3/4]',
    },
    {
        id: 3,
        title: 'Barra Premium',
        category: 'Barra',
        aspectRatio: 'aspect-[16/9]',
    },
    {
        id: 4,
        title: 'Cóctel Tokyo Sunset',
        category: 'Cócteles',
        aspectRatio: 'aspect-square',
    },
    {
        id: 5,
        title: 'Mesa Compartida',
        category: 'Ambiente',
        aspectRatio: 'aspect-[4/3]',
    },
    {
        id: 6,
        title: 'Detalle Plato',
        category: 'Platos',
        aspectRatio: 'aspect-[3/4]',
    },
];

export default function GallerySection() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });
    const [hoveredId, setHoveredId] = useState<number | null>(null);

    return (
        <section
            id="galeria"
            ref={ref}
            className="relative py-24 md:py-32 bg-brand-darker overflow-hidden"
        >
            {/* Background effects */}
            <div className="absolute inset-0">
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-neon-cyan/5 rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-neon-magenta/5 rounded-full blur-3xl" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <span className="text-brand-gold text-sm font-medium uppercase tracking-widest">
                        Momentos
                    </span>
                    <h2 className="mt-4 text-4xl md:text-5xl lg:text-6xl font-bold">
                        <span className="gradient-text">Galería</span>
                    </h2>
                    <p className="mt-4 text-lg text-white/60 max-w-2xl mx-auto">
                        Capturas de lo que te espera. Ambiente, platos y detalles que hacen única cada visita.
                    </p>
                </motion.div>

                {/* Masonry-style gallery grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                    {galleryItems.map((item, index) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={isInView ? { opacity: 1, scale: 1 } : {}}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className={`
                relative group overflow-hidden rounded-2xl cursor-pointer
                ${item.aspectRatio}
                ${index === 2 ? 'col-span-2 md:col-span-1' : ''}
              `}
                            onMouseEnter={() => setHoveredId(item.id)}
                            onMouseLeave={() => setHoveredId(null)}
                        >
                            {/* Placeholder with gradient (replace with actual images) */}
                            <div className={`
                absolute inset-0 transition-transform duration-700 ease-out
                ${hoveredId === item.id ? 'scale-110' : 'scale-100'}
              `}>
                                {/* Gradient placeholder - in production, use <Image /> */}
                                <div className={`
                  w-full h-full
                  ${index % 3 === 0 ? 'bg-gradient-to-br from-santorini-600 via-santorini-800 to-brand-navy' : ''}
                  ${index % 3 === 1 ? 'bg-gradient-to-br from-neon-magenta/40 via-brand-dark to-neon-pink/30' : ''}
                  ${index % 3 === 2 ? 'bg-gradient-to-br from-neon-cyan/30 via-brand-navy to-neon-blue/20' : ''}
                `} />

                                {/* Noise texture overlay */}
                                <div className="absolute inset-0 opacity-30 mix-blend-overlay bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PC9maWx0ZXI+PHJlY3Qgd2lkdGg9IjMwMCIgaGVpZ2h0PSIzMDAiIGZpbHRlcj0idXJsKCNhKSIgb3BhY2l0eT0iMC4xNSIvPjwvc3ZnPg==')]" />
                            </div>

                            {/* Overlay */}
                            <div className={`
                absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent
                transition-opacity duration-500
                ${hoveredId === item.id ? 'opacity-100' : 'opacity-60'}
              `} />

                            {/* Glow effect on hover */}
                            <div className={`
                absolute inset-0 transition-opacity duration-500
                ${hoveredId === item.id ? 'opacity-100' : 'opacity-0'}
              `}>
                                <div className="absolute inset-0 border-2 border-neon-cyan/50 rounded-2xl" />
                                <div className="absolute inset-0 shadow-[inset_0_0_30px_rgba(0,255,255,0.3)] rounded-2xl" />
                            </div>

                            {/* Content */}
                            <div className={`
                absolute bottom-0 left-0 right-0 p-4 md:p-6
                transition-transform duration-500
                ${hoveredId === item.id ? 'translate-y-0' : 'translate-y-2'}
              `}>
                                <span className="text-xs font-medium text-neon-cyan uppercase tracking-wider">
                                    {item.category}
                                </span>
                                <h3 className="mt-1 text-lg md:text-xl font-bold text-white">
                                    {item.title}
                                </h3>
                            </div>

                            {/* Plus icon on hover */}
                            <div className={`
                absolute top-4 right-4 w-10 h-10 rounded-full
                bg-white/10 backdrop-blur-sm border border-white/20
                flex items-center justify-center
                transition-all duration-500
                ${hoveredId === item.id ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}
              `}>
                                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                </svg>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Instagram CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.8 }}
                    className="text-center mt-12"
                >
                    <a
                        href="https://instagram.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-white/60 hover:text-neon-magenta transition-colors"
                    >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                        </svg>
                        <span className="text-sm font-medium">@sedayolivo</span>
                    </a>
                </motion.div>
            </div>
        </section>
    );
}
