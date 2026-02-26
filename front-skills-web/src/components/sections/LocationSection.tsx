'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const scheduleData = {
    address: 'Calle del Almirante 21, 28004 Madrid',
    phone: '+34 912 345 678',
    whatsapp: '+34 612 345 678',
    email: 'reservas@sedayolivo.es',
    hours: [
        { days: 'Martes - Viernes', lunch: '13:00 - 16:00', dinner: '20:00 - 00:00' },
        { days: 'Sábado', lunch: '13:00 - 16:30', dinner: '20:00 - 01:00' },
        { days: 'Domingo', lunch: '13:00 - 17:00', dinner: 'Cerrado' },
        { days: 'Lunes', lunch: 'Cerrado', dinner: 'Cerrado' },
    ],
    directions: [
        { icon: '🚇', text: 'Metro Chueca (L5) a 2 minutos' },
        { icon: '🚌', text: 'Bus líneas 3, 40, 149' },
        { icon: '🚗', text: 'Parking público en Plaza del Rey' },
    ],
};

export default function LocationSection() {
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
            id="ubicacion"
            ref={ref}
            className="relative py-24 md:py-32 bg-brand-darker overflow-hidden"
        >
            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-transparent to-transparent" />

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <span className="text-santorini-400 text-sm font-medium uppercase tracking-widest">
                        Encuéntranos
                    </span>
                    <h2 className="mt-4 text-4xl md:text-5xl lg:text-6xl font-bold">
                        <span className="gradient-text">Ubicación</span>
                    </h2>
                </motion.div>

                <div className="grid gap-12 lg:grid-cols-2">
                    {/* Map placeholder */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="relative aspect-[4/3] lg:aspect-auto lg:h-full rounded-2xl overflow-hidden"
                    >
                        {/* Placeholder for map - in production use Google Maps or Mapbox */}
                        <div className="absolute inset-0 bg-gradient-to-br from-santorini-900 via-brand-navy to-brand-dark">
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="text-center space-y-4">
                                    <div className="w-16 h-16 mx-auto rounded-full bg-neon-magenta/20 flex items-center justify-center">
                                        <svg className="w-8 h-8 text-neon-magenta" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                    </div>
                                    <p className="text-white/60 text-sm">
                                        Mapa interactivo
                                    </p>
                                </div>
                            </div>

                            {/* Decorative elements */}
                            <div className="absolute top-0 right-0 w-32 h-32 bg-neon-cyan/10 rounded-full blur-2xl" />
                            <div className="absolute bottom-0 left-0 w-24 h-24 bg-neon-magenta/10 rounded-full blur-2xl" />
                        </div>

                        {/* Border glow */}
                        <div className="absolute inset-0 border border-white/10 rounded-2xl pointer-events-none" />
                    </motion.div>

                    {/* Info */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="space-y-8"
                    >
                        {/* Address card */}
                        <div className="glass rounded-2xl p-6">
                            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-3">
                                <span className="w-10 h-10 rounded-full bg-neon-magenta/20 flex items-center justify-center">
                                    <svg className="w-5 h-5 text-neon-magenta" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    </svg>
                                </span>
                                Dirección
                            </h3>
                            <p className="text-white/80 text-lg">{scheduleData.address}</p>

                            {/* Directions */}
                            <div className="mt-4 space-y-2">
                                {scheduleData.directions.map((dir, index) => (
                                    <div key={index} className="flex items-center gap-3 text-sm text-white/60">
                                        <span>{dir.icon}</span>
                                        <span>{dir.text}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Hours card */}
                        <div className="glass rounded-2xl p-6">
                            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-3">
                                <span className="w-10 h-10 rounded-full bg-neon-cyan/20 flex items-center justify-center">
                                    <svg className="w-5 h-5 text-neon-cyan" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </span>
                                Horarios
                            </h3>

                            <div className="space-y-3">
                                {scheduleData.hours.map((schedule, index) => (
                                    <div key={index} className="flex justify-between items-center text-sm">
                                        <span className="font-medium text-white/80">{schedule.days}</span>
                                        <div className="flex gap-4 text-white/60">
                                            <span>{schedule.lunch}</span>
                                            <span className="text-white/20">|</span>
                                            <span>{schedule.dinner}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Contact card */}
                        <div className="glass rounded-2xl p-6">
                            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-3">
                                <span className="w-10 h-10 rounded-full bg-brand-gold/20 flex items-center justify-center">
                                    <svg className="w-5 h-5 text-brand-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                    </svg>
                                </span>
                                Contacto
                            </h3>

                            <div className="space-y-3">
                                <a
                                    href={`tel:${scheduleData.phone}`}
                                    className="flex items-center gap-3 text-white/80 hover:text-neon-cyan transition-colors"
                                >
                                    <span>📞</span>
                                    <span>{scheduleData.phone}</span>
                                </a>
                                <a
                                    href={`https://wa.me/${scheduleData.whatsapp.replace(/\s/g, '')}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-3 text-white/80 hover:text-green-400 transition-colors"
                                >
                                    <span>💬</span>
                                    <span>WhatsApp: {scheduleData.whatsapp}</span>
                                </a>
                                <a
                                    href={`mailto:${scheduleData.email}`}
                                    className="flex items-center gap-3 text-white/80 hover:text-neon-magenta transition-colors"
                                >
                                    <span>✉️</span>
                                    <span>{scheduleData.email}</span>
                                </a>
                            </div>
                        </div>

                        {/* CTA */}
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.4, delay: 0.6 }}
                        >
                            <button
                                onClick={() => scrollToSection('reservas')}
                                className="btn-primary w-full justify-center"
                            >
                                <span>Reservar mesa</span>
                            </button>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
