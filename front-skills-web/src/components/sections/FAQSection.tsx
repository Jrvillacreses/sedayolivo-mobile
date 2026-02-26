'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';

const faqs = [
    {
        question: '¿Tienen opciones para alérgenos e intolerancias?',
        answer: 'Absolutamente. Nuestra carta está adaptada para indicar alérgenos. Además, si nos avisas al reservar, nuestro chef puede preparar versiones personalizadas de muchos platos. Trabajamos con intolerancias al gluten, lactosa, frutos secos y más.',
    },
    {
        question: '¿Puedo reservar para un grupo grande o evento privado?',
        answer: 'Sí. Aceptamos grupos de hasta 20 personas en nuestra zona central. Para eventos privados o grupos mayores, contamos con un espacio exclusivo. Contáctanos por teléfono y diseñamos juntos el menú perfecto.',
    },
    {
        question: '¿Organizan cumpleaños o celebraciones especiales?',
        answer: 'Nos encanta celebrar contigo. Ofrecemos tartas personalizadas, menús degustación especiales y decoración sutil si lo deseas. Simplemente indícalo al reservar o llámanos con antelación.',
    },
    {
        question: '¿Puedo modificar mi reserva?',
        answer: 'Sí, puedes modificar fecha, hora o número de personas hasta 24 horas antes sin coste. Hazlo desde el email de confirmación o llamándonos directamente.',
    },
    {
        question: '¿Cuál es la política de cancelación?',
        answer: 'Cancelaciones hasta 24 horas antes: sin cargo. Cancelaciones con menos de 24 horas o no-shows: puede aplicarse un cargo de 20€/persona en reservas de fin de semana o grupos.',
    },
    {
        question: '¿Hay parking cerca?',
        answer: 'Sí. El parking público de Plaza del Rey está a 2 minutos andando. También hay zona azul en calles adyacentes (gratuita a partir de las 21:00 y fines de semana).',
    },
    {
        question: '¿Aceptan mascotas?',
        answer: 'Lamentablemente, por normativa sanitaria solo admitimos perros guía. Nuestro espacio es reducido y preferimos garantizar la mejor experiencia para todos.',
    },
];

function FAQItem({
    faq,
    isOpen,
    onToggle,
    index,
}: {
    faq: typeof faqs[0];
    isOpen: boolean;
    onToggle: () => void;
    index: number;
}) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-50px' });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="border-b border-white/10 last:border-b-0"
        >
            <button
                onClick={onToggle}
                className="w-full py-6 flex items-start justify-between gap-4 text-left group"
                aria-expanded={isOpen}
            >
                <span className="text-lg font-medium text-white group-hover:text-neon-cyan transition-colors">
                    {faq.question}
                </span>
                <span className={`
          flex-shrink-0 w-8 h-8 rounded-full border border-white/20
          flex items-center justify-center
          transition-all duration-300
          ${isOpen ? 'bg-neon-cyan border-neon-cyan rotate-180' : 'group-hover:border-neon-cyan'}
        `}>
                    <svg
                        className={`w-4 h-4 transition-colors ${isOpen ? 'text-brand-dark' : 'text-white/60'}`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </span>
            </button>

            <motion.div
                initial={false}
                animate={{
                    height: isOpen ? 'auto' : 0,
                    opacity: isOpen ? 1 : 0,
                }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="overflow-hidden"
            >
                <p className="pb-6 text-white/60 leading-relaxed pr-12">
                    {faq.answer}
                </p>
            </motion.div>
        </motion.div>
    );
}

export default function FAQSection() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    return (
        <section
            id="faq"
            ref={ref}
            className="relative py-24 md:py-32 bg-brand-dark overflow-hidden"
        >
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-brand-darker/50 to-transparent" />

            <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <span className="text-neon-cyan text-sm font-medium uppercase tracking-widest">
                        Preguntas Frecuentes
                    </span>
                    <h2 className="mt-4 text-4xl md:text-5xl font-bold">
                        <span className="gradient-text">FAQ</span>
                    </h2>
                    <p className="mt-4 text-lg text-white/60">
                        Todo lo que necesitas saber antes de visitarnos.
                    </p>
                </motion.div>

                {/* FAQ list */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="glass rounded-2xl px-6 md:px-8"
                >
                    {faqs.map((faq, index) => (
                        <FAQItem
                            key={index}
                            faq={faq}
                            index={index}
                            isOpen={openIndex === index}
                            onToggle={() => setOpenIndex(openIndex === index ? null : index)}
                        />
                    ))}
                </motion.div>

                {/* Still have questions */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    className="text-center mt-12"
                >
                    <p className="text-white/60">
                        ¿Otra duda?{' '}
                        <a
                            href="mailto:reservas@sedayolivo.es"
                            className="text-neon-magenta hover:underline"
                        >
                            Escríbenos
                        </a>
                        {' '}y te respondemos en menos de 24h.
                    </p>
                </motion.div>
            </div>
        </section>
    );
}
