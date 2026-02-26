/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        formats: ['image/webp', 'image/avif'],
        deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    },
    experimental: {
        optimizePackageImports: ['framer-motion'],
    },
};

module.exports = nextConfig;
