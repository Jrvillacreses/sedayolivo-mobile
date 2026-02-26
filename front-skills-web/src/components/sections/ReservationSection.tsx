'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';

interface FormData {
    name: string;
    email: string;
    date: string;
    time: string;
    guests: string;
    preferences: string;
}

export default function ReservationSection() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });

    const [formData, setFormData] = useState<FormData>({
        name: '',
        email: '',
        date: '',
        time: '',
        guests: '2',
        preferences: '',
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));

        setIsSubmitting(false);
        setIsSubmitted(true);
    };

    const scrollToSection = (sectionId: string) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const timeSlots = [
        '13:00', '13:30', '14:00', '14:30',
        '20:00', '20:30', '21:00', '21:30', '22:00',
    ];

    // Get minimum date (today)
    const today = new Date().toISOString().split('T')[0];

    return (
        <section
            id="reservas"
            ref={ref}
            className="relative py-24 md:py-32 bg-brand-dark overflow-hidden"
        >
            {/* Background */}
            <div className="absolute inset-0">
                <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-neon-magenta/10 rounded-full blur-3xl" />
                <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-neon-cyan/10 rounded-full blur-3xl" />
            </div>

            <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                >
                    <span className="text-neon-magenta text-sm font-medium uppercase tracking-widest">
                        Tu Mesa Espera
                    </span>
                    <h2 className="mt-4 text-4xl md:text-5xl lg:text-6xl font-bold">
                        <span className="gradient-text">Reservar</span>
                    </h2>
                    <p className="mt-4 text-lg text-white/60 max-w-xl mx-auto">
                        Confirmación inmediata. Si tienes alguna preferencia especial, cuéntanos.
                    </p>
                </motion.div>

                {/* Form card */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="glass rounded-3xl p-6 md:p-10"
                >
                    {isSubmitted ? (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="text-center py-12"
                        >
                            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-r from-neon-cyan to-neon-magenta flex items-center justify-center">
                                <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-2">¡Reserva Confirmada!</h3>
                            <p className="text-white/60 mb-6">
                                Te hemos enviado un email con los detalles. ¡Te esperamos!
                            </p>
                            <button
                                onClick={() => setIsSubmitted(false)}
                                className="btn-secondary"
                            >
                                Hacer otra reserva
                            </button>
                        </motion.div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Row 1: Name & Email */}
                            <div className="grid gap-6 md:grid-cols-2">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-white/80 mb-2">
                                        Nombre completo *
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        required
                                        value={formData.name}
                                        onChange={handleChange}
                                        placeholder="Tu nombre"
                                        className="input-premium"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-white/80 mb-2">
                                        Email *
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        required
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="tu@email.com"
                                        className="input-premium"
                                    />
                                </div>
                            </div>

                            {/* Row 2: Date, Time, Guests */}
                            <div className="grid gap-6 md:grid-cols-3">
                                <div>
                                    <label htmlFor="date" className="block text-sm font-medium text-white/80 mb-2">
                                        Fecha *
                                    </label>
                                    <input
                                        type="date"
                                        id="date"
                                        name="date"
                                        required
                                        min={today}
                                        value={formData.date}
                                        onChange={handleChange}
                                        className="input-premium"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="time" className="block text-sm font-medium text-white/80 mb-2">
                                        Hora *
                                    </label>
                                    <select
                                        id="time"
                                        name="time"
                                        required
                                        value={formData.time}
                                        onChange={handleChange}
                                        className="input-premium"
                                    >
                                        <option value="">Seleccionar</option>
                                        <optgroup label="Comida">
                                            {timeSlots.slice(0, 4).map(time => (
                                                <option key={time} value={time}>{time}</option>
                                            ))}
                                        </optgroup>
                                        <optgroup label="Cena">
                                            {timeSlots.slice(4).map(time => (
                                                <option key={time} value={time}>{time}</option>
                                            ))}
                                        </optgroup>
                                    </select>
                                </div>
                                <div>
                                    <label htmlFor="guests" className="block text-sm font-medium text-white/80 mb-2">
                                        Personas *
                                    </label>
                                    <select
                                        id="guests"
                                        name="guests"
                                        required
                                        value={formData.guests}
                                        onChange={handleChange}
                                        className="input-premium"
                                    >
                                        {[1, 2, 3, 4, 5, 6, 7, 8].map(num => (
                                            <option key={num} value={num}>
                                                {num} {num === 1 ? 'persona' : 'personas'}
                                            </option>
                                        ))}
                                        <option value="9+">Grupo (+8)</option>
                                    </select>
                                </div>
                            </div>

                            {/* Row 3: Preferences */}
                            <div>
                                <label htmlFor="preferences" className="block text-sm font-medium text-white/80 mb-2">
                                    Preferencias o alergias
                                    <span className="text-white/40 ml-1">(opcional)</span>
                                </label>
                                <textarea
                                    id="preferences"
                                    name="preferences"
                                    rows={3}
                                    value={formData.preferences}
                                    onChange={handleChange}
                                    placeholder="Celebración especial, alergias, dietas, preferencias de mesa..."
                                    className="input-premium resize-none"
                                />
                            </div>

                            {/* Trust signals */}
                            <div className="flex flex-wrap gap-4 pt-2 text-sm text-white/40">
                                <span className="flex items-center gap-2">
                                    <svg className="w-4 h-4 text-neon-cyan" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    Confirmación rápida
                                </span>
                                <span className="flex items-center gap-2">
                                    <svg className="w-4 h-4 text-neon-cyan" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    Atención personalizada
                                </span>
                                <span className="flex items-center gap-2">
                                    <svg className="w-4 h-4 text-neon-cyan" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    Cancelación flexible
                                </span>
                            </div>

                            {/* Submit */}
                            <div className="flex flex-col sm:flex-row gap-4 pt-4">
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="btn-primary flex-1 justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isSubmitting ? (
                                        <span className="flex items-center gap-2">
                                            <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                            </svg>
                                            Procesando...
                                        </span>
                                    ) : (
                                        <span>Confirmar reserva</span>
                                    )}
                                </button>
                                <button
                                    type="button"
                                    onClick={() => scrollToSection('ubicacion')}
                                    className="btn-secondary"
                                >
                                    Ver ubicación
                                </button>
                            </div>
                        </form>
                    )}
                </motion.div>

                {/* Alternative CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    className="text-center mt-8"
                >
                    <p className="text-white/40 text-sm">
                        ¿Grupo grande o evento especial?{' '}
                        <a href="tel:+34912345678" className="text-neon-cyan hover:underline">
                            Llámanos directamente
                        </a>
                    </p>
                </motion.div>
            </div>
        </section>
    );
}
