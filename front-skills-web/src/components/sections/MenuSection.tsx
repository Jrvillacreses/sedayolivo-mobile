'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const menuCategories = [
    {
        name: 'Tapas Fusión',
        icon: '🥢',
        items: [
            {
                name: 'Tataki de Atún Santorini',
                description: 'Atún sellado con costra de sésamo, espuma de feta y aceite de oliva Koroneiki. Frescura del Egeo con precisión de Tokio.',
                price: '18€',
                signature: true,
            },
            {
                name: 'Gyozas de Rabo de Toro',
                description: 'Rellenas de rabo confitado 8 horas, salsa Pedro Ximénez reducida y microgreens.',
                price: '14€',
            },
            {
                name: 'Tartar de Gambas Blancas',
                description: 'Gamba de Huelva con yuzu kosho, aguacate cremoso y crujiente de wonton.',
                price: '16€',
            },
            {
                name: 'Pulpo Nikkei',
                description: 'Pulpo a la brasa con anticucho de ají panca, patata violeta y aceite de pimentón.',
                price: '22€',
                signature: true,
            },
        ],
    },
    {
        name: 'Bento Mediterráneo',
        icon: '🍱',
        items: [
            {
                name: 'Lubina Miso al Azafrán',
                description: 'Filete de lubina marinado en miso blanco, caldo de azafrán y verduras baby.',
                price: '28€',
                signature: true,
            },
            {
                name: 'Cordero Teriyaki',
                description: 'Paletilla confitada con glaseado teriyaki-romero, puré de berenjena y za\'atar.',
                price: '26€',
            },
            {
                name: 'Arroz Caldoso Umami',
                description: 'Arroz bomba, dashi de gambas, setas shiitake y jamón ibérico crujiente.',
                price: '24€',
            },
        ],
    },
    {
        name: 'Cócteles & Maridajes',
        icon: '🍸',
        items: [
            {
                name: 'Tokyo Sunset',
                description: 'Sake junmai, hibisco, yuzu y espuma de jengibre. Servido en copa helada.',
                price: '14€',
            },
            {
                name: 'Santorini Spritz',
                description: 'Ouzo, Aperol, vino blanco de Assyrtiko y twist de naranja sanguina.',
                price: '12€',
            },
            {
                name: 'Omakase de Vinos',
                description: 'Selección del sommelier: 4 copas maridadas con tu experiencia.',
                price: '35€',
            },
        ],
    },
    {
        name: 'Postres con Giro',
        icon: '🍡',
        items: [
            {
                name: 'Mochi de Aceite de Oliva',
                description: 'Helado de AOVE arbequina envuelto en mochi, polvo de aceitunas negras.',
                price: '10€',
            },
            {
                name: 'Tarta de Queso Matcha',
                description: 'Cheesecake estilo vasco con matcha ceremonial y mermelada de higo.',
                price: '11€',
            },
        ],
    },
];

export default function MenuSection() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });

    const scrollToSection = (sectionId: string) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <section
            id="menu"
            ref={ref}
            className="relative py-24 md:py-32 bg-brand-darker overflow-hidden"
        >
            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-brand-dark via-transparent to-brand-dark opacity-50" />

            {/* Decorative elements */}
            <div className="absolute top-0 left-0 w-96 h-96 bg-neon-magenta/5 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-neon-cyan/5 rounded-full blur-3xl" />

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <span className="text-neon-cyan text-sm font-medium uppercase tracking-widest">
                        Nuestra Carta
                    </span>
                    <h2 className="mt-4 text-4xl md:text-5xl lg:text-6xl font-bold">
                        <span className="gradient-text">Menú</span>
                    </h2>
                    <p className="mt-4 text-lg text-white/60 max-w-2xl mx-auto">
                        Cada plato cuenta una historia de dos mundos. Precios orientativos; algunos platos varían según temporada.
                    </p>
                </motion.div>

                {/* Menu categories */}
                <div className="space-y-16">
                    {menuCategories.map((category, categoryIndex) => (
                        <motion.div
                            key={category.name}
                            initial={{ opacity: 0, y: 40 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6, delay: categoryIndex * 0.15 }}
                        >
                            {/* Category header */}
                            <div className="flex items-center gap-4 mb-8">
                                <span className="text-3xl">{category.icon}</span>
                                <h3 className="text-2xl md:text-3xl font-bold text-white">
                                    {category.name}
                                </h3>
                                <div className="flex-1 h-px bg-gradient-to-r from-white/20 to-transparent" />
                            </div>

                            {/* Items grid */}
                            <div className="grid gap-6 md:grid-cols-2">
                                {category.items.map((item, itemIndex) => (
                                    <motion.div
                                        key={item.name}
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={isInView ? { opacity: 1, scale: 1 } : {}}
                                        transition={{ duration: 0.4, delay: categoryIndex * 0.1 + itemIndex * 0.05 }}
                                        className={`
                      card-glass group cursor-default
                      ${item.signature ? 'border-neon-magenta/30 bg-neon-magenta/5' : ''}
                    `}
                                    >
                                        <div className="flex justify-between items-start gap-4">
                                            <div className="flex-1">
                                                <div className="flex items-center gap-2">
                                                    <h4 className="text-lg font-semibold text-white group-hover:text-neon-cyan transition-colors">
                                                        {item.name}
                                                    </h4>
                                                    {item.signature && (
                                                        <span className="px-2 py-0.5 text-xs font-medium bg-neon-magenta/20 text-neon-magenta rounded-full">
                                                            Firma
                                                        </span>
                                                    )}
                                                </div>
                                                <p className="mt-2 text-sm text-white/60 leading-relaxed">
                                                    {item.description}
                                                </p>
                                            </div>
                                            <span className="text-lg font-bold text-neon-cyan whitespace-nowrap">
                                                {item.price}
                                            </span>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.8 }}
                    className="text-center mt-16"
                >
                    <button
                        onClick={() => scrollToSection('reservas')}
                        className="btn-primary"
                    >
                        <span>Reservar mesa</span>
                    </button>
                </motion.div>
            </div>
        </section>
    );
}
