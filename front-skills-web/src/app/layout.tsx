import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-inter',
});

export const metadata: Metadata = {
    title: 'Seda & Olivo | Fusión Mediterránea & Japonesa',
    description: 'Donde el Sol se encuentra con el Dragón. Tapas para compartir, técnica japonesa, alma mediterránea. Reserva tu experiencia gastronómica única.',
    keywords: ['restaurante fusión', 'cocina japonesa', 'mediterránea', 'tapas', 'Madrid', 'reservas', 'gastronomía'],
    authors: [{ name: 'Seda & Olivo' }],
    openGraph: {
        title: 'Seda & Olivo | Fusión Mediterránea & Japonesa',
        description: 'Donde el Sol se encuentra con el Dragón. Reserva tu experiencia gastronómica única.',
        type: 'website',
        locale: 'es_ES',
        siteName: 'Seda & Olivo',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Seda & Olivo | Fusión Mediterránea & Japonesa',
        description: 'Donde el Sol se encuentra con el Dragón. Reserva tu experiencia única.',
    },
    robots: {
        index: true,
        follow: true,
    },
};

export const viewport: Viewport = {
    width: 'device-width',
    initialScale: 1,
    themeColor: '#0a0a0f',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="es" className={inter.variable}>
            <body className={`${inter.className} overflow-x-hidden`}>
                <a
                    href="#menu"
                    className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-neon-magenta focus:text-white focus:rounded-lg"
                >
                    Saltar al contenido principal
                </a>
                {children}
            </body>
        </html>
    );
}
