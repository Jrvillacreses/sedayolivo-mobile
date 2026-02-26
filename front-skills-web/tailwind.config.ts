import type { Config } from 'tailwindcss';

const config: Config = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors: {
                // Santorini inspired
                'santorini': {
                    50: '#f0f9ff',
                    100: '#e0f2fe',
                    200: '#bae6fd',
                    300: '#7dd3fc',
                    400: '#38bdf8',
                    500: '#0ea5e9',
                    600: '#0284c7',
                    700: '#0369a1',
                    800: '#075985',
                    900: '#0c4a6e',
                },
                // Tokyo neon inspired
                'neon': {
                    magenta: '#ff00ff',
                    cyan: '#00ffff',
                    pink: '#ff1493',
                    blue: '#00bfff',
                    purple: '#9400d3',
                },
                // Brand colors
                'brand': {
                    dark: '#0a0a0f',
                    darker: '#050508',
                    navy: '#0f172a',
                    gold: '#d4af37',
                },
            },
            fontFamily: {
                sans: ['Inter', 'system-ui', 'sans-serif'],
                display: ['Inter', 'system-ui', 'sans-serif'],
            },
            animation: {
                'glow-pulse': 'glow-pulse 2s ease-in-out infinite',
                'fade-up': 'fade-up 0.5s ease-out forwards',
                'fade-in': 'fade-in 0.5s ease-out forwards',
                'shimmer': 'shimmer 2s linear infinite',
            },
            keyframes: {
                'glow-pulse': {
                    '0%, 100%': {
                        boxShadow: '0 0 20px rgba(255, 0, 255, 0.4), 0 0 40px rgba(0, 255, 255, 0.2)',
                    },
                    '50%': {
                        boxShadow: '0 0 30px rgba(255, 0, 255, 0.6), 0 0 60px rgba(0, 255, 255, 0.4)',
                    },
                },
                'fade-up': {
                    '0%': { opacity: '0', transform: 'translateY(20px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                'fade-in': {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                'shimmer': {
                    '0%': { backgroundPosition: '-200% 0' },
                    '100%': { backgroundPosition: '200% 0' },
                },
            },
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'gradient-neon': 'linear-gradient(135deg, #00ffff 0%, #ff00ff 50%, #00bfff 100%)',
                'gradient-santorini': 'linear-gradient(180deg, #0ea5e9 0%, #38bdf8 50%, #bae6fd 100%)',
            },
            boxShadow: {
                'neon': '0 0 20px rgba(255, 0, 255, 0.5), 0 0 40px rgba(0, 255, 255, 0.3)',
                'neon-sm': '0 0 10px rgba(255, 0, 255, 0.3), 0 0 20px rgba(0, 255, 255, 0.2)',
                'glow': '0 0 30px rgba(255, 0, 255, 0.4)',
                'soft': '0 4px 30px rgba(0, 0, 0, 0.3)',
            },
        },
    },
    plugins: [],
};

export default config;
