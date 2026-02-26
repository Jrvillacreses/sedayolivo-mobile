import dynamic from 'next/dynamic';
import MenuSection from '@/components/sections/MenuSection';
import ExperienceSection from '@/components/sections/ExperienceSection';
import GallerySection from '@/components/sections/GallerySection';
import ReservationSection from '@/components/sections/ReservationSection';
import LocationSection from '@/components/sections/LocationSection';
import FAQSection from '@/components/sections/FAQSection';
import Footer from '@/components/sections/Footer';

// Dynamic import for HeroFallback (CSS gradient hero - always works)
const HeroFallback = dynamic(
    () => import('@/components/HeroFallback'),
    {
        ssr: false,
        loading: () => (
            <div className="h-screen flex items-center justify-center bg-brand-darker">
                <div className="text-center space-y-4">
                    <div className="w-16 h-16 mx-auto rounded-full border-4 border-white/10 border-t-neon-magenta animate-spin" />
                    <p className="text-white/40 text-sm">Cargando...</p>
                </div>
            </div>
        ),
    }
);

// Dynamic import for CameraScroll (canvas-based hero - requires frames)
const CameraScroll = dynamic(
    () => import('@/components/CameraScroll'),
    {
        ssr: false,
        loading: () => (
            <div className="h-screen flex items-center justify-center bg-brand-darker">
                <div className="text-center space-y-4">
                    <div className="w-16 h-16 mx-auto rounded-full border-4 border-white/10 border-t-neon-magenta animate-spin" />
                    <p className="text-white/40 text-sm">Cargando...</p>
                </div>
            </div>
        ),
    }
);

// Set to true when you have frames in /frames folder
const USE_FRAME_ANIMATION = true;

export default function Home() {
    return (
        <main className="relative">
            {/* Hero - Scrollytelling
                Uses HeroFallback (CSS gradients) by default
                Switch USE_FRAME_ANIMATION to true when you have frames */}
            {USE_FRAME_ANIMATION ? <CameraScroll /> : <HeroFallback />}

            {/* Menu Section */}
            <MenuSection />

            {/* Experience Section */}
            <ExperienceSection />

            {/* Gallery Section */}
            <GallerySection />

            {/* Reservation Section */}
            <ReservationSection />

            {/* Location Section */}
            <LocationSection />

            {/* FAQ Section */}
            <FAQSection />

            {/* Footer */}
            <Footer />
        </main>
    );
}
