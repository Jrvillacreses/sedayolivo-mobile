'use client';

import { motion } from 'framer-motion';

const socialLinks = [
    {
        name: 'Instagram',
        href: 'https://instagram.com/sedayolivo',
        icon: (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
            </svg>
        ),
    },
    {
        name: 'TikTok',
        href: 'https://tiktok.com/@sedayolivo',
        icon: (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z" />
            </svg>
        ),
    },
    {
        name: 'Google',
        href: 'https://g.page/sedayolivo',
        icon: (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z" />
            </svg>
        ),
    },
];

const footerLinks = [
    { name: 'Carta', href: '#menu' },
    { name: 'Reservas', href: '#reservas' },
    { name: 'Ubicación', href: '#ubicacion' },
    { name: 'FAQ', href: '#faq' },
];

const legalLinks = [
    { name: 'Política de Privacidad', href: '/privacidad' },
    { name: 'Aviso Legal', href: '/legal' },
    { name: 'Cookies', href: '/cookies' },
];

export default function Footer() {
    const currentYear = new Date().getFullYear();

    const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        if (href.startsWith('#')) {
            e.preventDefault();
            const element = document.getElementById(href.substring(1));
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }
    };

    return (
        <footer className="relative bg-brand-darker border-t border-white/5">
            {/* Decorative gradient */}
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-neon-magenta/50 to-transparent" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
                    {/* Brand */}
                    <div className="lg:col-span-2">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                        >
                            <h3 className="text-2xl font-bold">
                                <span className="gradient-text">SEDA</span>
                                <span className="text-white"> & </span>
                                <span className="gradient-text-warm">OLIVO</span>
                            </h3>
                            <p className="mt-4 text-white/60 max-w-md leading-relaxed">
                                Fusión mediterránea y japonesa en el corazón de Madrid.
                                Donde la técnica del Sol Naciente se encuentra con el alma del Mediterráneo.
                            </p>

                            {/* Social links */}
                            <div className="flex gap-4 mt-6">
                                {socialLinks.map((social) => (
                                    <a
                                        key={social.name}
                                        href={social.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-neon-cyan hover:border-neon-cyan/50 hover:bg-neon-cyan/10 transition-all duration-300"
                                        aria-label={social.name}
                                    >
                                        {social.icon}
                                    </a>
                                ))}
                            </div>
                        </motion.div>
                    </div>

                    {/* Quick links */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                    >
                        <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
                            Explora
                        </h4>
                        <ul className="space-y-3">
                            {footerLinks.map((link) => (
                                <li key={link.name}>
                                    <a
                                        href={link.href}
                                        onClick={(e) => scrollToSection(e, link.href)}
                                        className="text-white/60 hover:text-neon-cyan transition-colors"
                                    >
                                        {link.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Contact */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
                            Contacto
                        </h4>
                        <ul className="space-y-3 text-white/60">
                            <li>
                                <a href="tel:+34912345678" className="hover:text-neon-magenta transition-colors">
                                    +34 912 345 678
                                </a>
                            </li>
                            <li>
                                <a href="mailto:reservas@sedayolivo.es" className="hover:text-neon-magenta transition-colors">
                                    reservas@sedayolivo.es
                                </a>
                            </li>
                            <li className="text-sm">
                                Calle del Almirante 21
                                <br />
                                28004 Madrid
                            </li>
                        </ul>
                    </motion.div>
                </div>

                {/* Bottom bar */}
                <div className="mt-16 pt-8 border-t border-white/5">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-sm text-white/40">
                            © {currentYear} Seda & Olivo. Todos los derechos reservados.
                        </p>

                        <div className="flex flex-wrap gap-6">
                            {legalLinks.map((link) => (
                                <a
                                    key={link.name}
                                    href={link.href}
                                    className="text-xs text-white/40 hover:text-white/60 transition-colors"
                                >
                                    {link.name}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Back to top button */}
            <motion.button
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="fixed bottom-8 left-8 w-12 h-12 rounded-full glass border border-white/20 flex items-center justify-center text-white/60 hover:text-neon-cyan hover:border-neon-cyan/50 transition-all duration-300 z-40"
                aria-label="Volver arriba"
            >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                </svg>
            </motion.button>
        </footer>
    );
}
