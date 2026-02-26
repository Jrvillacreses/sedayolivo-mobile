'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const pillars = [
    {
        icon: (
            <svg className="w-12 h-12" fill="none" viewBox="0 0 48 48" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M24 4l4 8 8 2-6 6 2 8-8-4-8 4 2-8-6-6 8-2 4-8z" />
                <circle cx="24" cy="32" r="8" strokeWidth={1.5} />
            </svg>
        ),
        title: 'Fusión con Propósito',
        description: 'No mezclamos por moda. Cada combinación nace de un estudio profundo de técnicas y sabores que se complementan naturalmente.',
    },
    {
        icon: (
            <svg className="w-12 h-12" fill="none" viewBox="0 0 48 48" stroke="currentColor">
                <rect x="8" y="16" width="32" height="24" rx="4" strokeWidth={1.5} />
                <path strokeLinecap="round" strokeWidth={1.5} d="M16 8h16M12 12h24" />
                <circle cx="24" cy="28" r="6" strokeWidth={1.5} />
                <path strokeLinecap="round" strokeWidth={1.5} d="M24 24v4l3 2" />
            </svg>
        ),
        title: 'Ambiente Inmersivo',
        description: 'Luz que baila entre neones y el azul del Egeo. Música que fluye de chill a electrónica según avanza la noche.',
    },
    {
        icon: (
            <svg className="w-12 h-12" fill="none" viewBox="0 0 48 48" stroke="currentColor">
                <circle cx="16" cy="20" r="8" strokeWidth={1.5} />
                <circle cx="32" cy="20" r="8" strokeWidth={1.5} />
                <circle cx="24" cy="32" r="8" strokeWidth={1.5} />
            </svg>
        ),
        title: 'Platos para Compartir',
        description: 'Diseñados para el centro de la mesa. Así se come aquí: probando, pasando, comentando. La conversación es parte del menú.',
    },
];

export default function ExperienceSection() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });

    return (
        <section
            id="experiencia"
            ref={ref}
            className="relative py-24 md:py-32 bg-brand-dark overflow-hidden"
        >
            {/* Background decoration */}
            <div className="absolute inset-0">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-neon-magenta/10 via-transparent to-transparent opacity-50" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-20"
                >
                    <span className="text-neon-magenta text-sm font-medium uppercase tracking-widest">
                        La Experiencia
                    </span>
                    <h2 className="mt-4 text-4xl md:text-5xl lg:text-6xl font-bold text-white">
                        Tokio de noche +
                        <br />
                        <span className="text-glow-cyan">Santorini al atardecer</span>
                    </h2>
                </motion.div>

                {/* Pillars */}
                <div className="grid gap-8 md:grid-cols-3">
                    {pillars.map((pillar, index) => (
                        <motion.div
                            key={pillar.title}
                            initial={{ opacity: 0, y: 40 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6, delay: index * 0.2 }}
                            className="group text-center"
                        >
                            <div className="inline-flex p-6 rounded-2xl bg-gradient-to-br from-neon-cyan/10 to-neon-magenta/10 border border-white/10 group-hover:border-neon-cyan/30 transition-all duration-500">
                                <span className="text-neon-cyan group-hover:text-neon-magenta transition-colors duration-500">
                                    {pillar.icon}
                                </span>
                            </div>

                            <h3 className="mt-6 text-xl font-bold text-white">
                                {pillar.title}
                            </h3>

                            <p className="mt-3 text-white/60 leading-relaxed">
                                {pillar.description}
                            </p>
                        </motion.div>
                    ))}
                </div>

                {/* Visual divider */}
                <motion.div
                    initial={{ scaleX: 0 }}
                    animate={isInView ? { scaleX: 1 } : {}}
                    transition={{ duration: 1, delay: 0.8 }}
                    className="mt-20 h-px bg-gradient-to-r from-transparent via-neon-cyan/50 to-transparent"
                />

                {/* Quote */}
                <motion.blockquote
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 1 }}
                    className="mt-16 text-center"
                >
                    <p className="text-2xl md:text-3xl font-light text-white/80 italic max-w-3xl mx-auto">
                        "No es solo una cena. Es un viaje sensorial entre dos culturas
                        que aman la perfección en sus formas más puras."
                    </p>
                    <footer className="mt-4 text-sm text-white/40">
                        — Filosofía Seda & Olivo
                    </footer>
                </motion.blockquote>
            </div>
        </section>
    );
}
