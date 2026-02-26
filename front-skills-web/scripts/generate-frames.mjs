/**
 * Generate scrollytelling frames for Seda & Olivo
 * Creates a visual transition: Santorini (calm, blue) → Tokyo (neon, electric) → Fusion
 * 
 * Run: node scripts/generate-frames.mjs
 */

import sharp from 'sharp';
import { mkdirSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const framesDir = join(__dirname, '..', 'frames');
const TOTAL_FRAMES = 90;
const WIDTH = 1920;
const HEIGHT = 1080;

// Ensure frames directory exists
if (!existsSync(framesDir)) {
    mkdirSync(framesDir, { recursive: true });
}

// Color palette
const colors = {
    // Santorini
    santoriniSky: { r: 135, g: 206, b: 250 },      // Light sky blue
    santoriniMid: { r: 14, g: 165, b: 233 },       // Ocean blue
    santoriniDeep: { r: 7, g: 89, b: 133 },        // Deep blue
    santoriniWhite: { r: 248, g: 250, b: 252 },    // White buildings
    santoriniSun: { r: 255, g: 223, b: 150 },      // Golden sun

    // Tokyo
    tokyoDark: { r: 10, g: 10, b: 15 },            // Dark background
    tokyoNavy: { r: 15, g: 23, b: 42 },            // Navy
    neonMagenta: { r: 255, g: 0, b: 255 },         // Neon magenta
    neonCyan: { r: 0, g: 255, b: 255 },            // Neon cyan
    neonPink: { r: 255, g: 20, b: 147 },           // Neon pink

    // Fusion
    fusionGold: { r: 212, g: 175, b: 55 },         // Gold accent
};

// Interpolate between two colors
function lerpColor(c1, c2, t) {
    return {
        r: Math.round(c1.r + (c2.r - c1.r) * t),
        g: Math.round(c1.g + (c2.g - c1.g) * t),
        b: Math.round(c1.b + (c2.b - c1.b) * t),
    };
}

// Easing function for smooth transitions
function easeInOutCubic(t) {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

// Generate SVG for a frame
function generateFrameSVG(frameIndex) {
    const progress = frameIndex / (TOTAL_FRAMES - 1);

    // Phase calculations
    // 0-30%: Santorini
    // 30-70%: Transition to Tokyo
    // 70-100%: Tokyo + Fusion

    let phase = 'santorini';
    let phaseProgress = 0;

    if (progress < 0.3) {
        phase = 'santorini';
        phaseProgress = progress / 0.3;
    } else if (progress < 0.7) {
        phase = 'transition';
        phaseProgress = (progress - 0.3) / 0.4;
    } else {
        phase = 'tokyo';
        phaseProgress = (progress - 0.7) / 0.3;
    }

    // Calculate colors based on phase
    let bgTop, bgMid, bgBottom;
    let glowOpacity = 0;
    let sunOpacity = 1;
    let neonGridOpacity = 0;
    let starsOpacity = 0;

    if (phase === 'santorini') {
        bgTop = colors.santoriniSky;
        bgMid = colors.santoriniMid;
        bgBottom = colors.santoriniDeep;
        sunOpacity = 1 - phaseProgress * 0.3;
    } else if (phase === 'transition') {
        const t = easeInOutCubic(phaseProgress);
        bgTop = lerpColor(colors.santoriniSky, colors.tokyoNavy, t);
        bgMid = lerpColor(colors.santoriniMid, colors.tokyoDark, t);
        bgBottom = lerpColor(colors.santoriniDeep, colors.tokyoDark, t);
        sunOpacity = 1 - t;
        glowOpacity = t * 0.6;
        neonGridOpacity = t * 0.15;
        starsOpacity = t * 0.8;
    } else {
        bgTop = colors.tokyoNavy;
        bgMid = colors.tokyoDark;
        bgBottom = colors.tokyoDark;
        sunOpacity = 0;
        glowOpacity = 0.6 + phaseProgress * 0.3;
        neonGridOpacity = 0.15 + phaseProgress * 0.1;
        starsOpacity = 0.8;
    }

    // Animated glow positions
    const glowX1 = 30 + Math.sin(progress * Math.PI * 2) * 10;
    const glowY1 = 40 + Math.cos(progress * Math.PI * 2) * 10;
    const glowX2 = 70 + Math.cos(progress * Math.PI * 2) * 10;
    const glowY2 = 60 + Math.sin(progress * Math.PI * 2) * 10;

    // Sun position (setting)
    const sunY = 25 + progress * 80;
    const sunScale = 1 - progress * 0.5;

    // Generate stars for night scene
    let stars = '';
    if (starsOpacity > 0) {
        for (let i = 0; i < 50; i++) {
            const x = (i * 37 + frameIndex * 2) % 100;
            const y = (i * 23) % 50;
            const size = 1 + (i % 3);
            const twinkle = 0.5 + Math.sin((frameIndex + i) * 0.1) * 0.5;
            stars += `<circle cx="${x}%" cy="${y}%" r="${size}" fill="white" opacity="${twinkle * starsOpacity}"/>`;
        }
    }

    // Grid pattern for Tokyo
    let neonGrid = '';
    if (neonGridOpacity > 0) {
        for (let i = 0; i < 20; i++) {
            const y = 50 + i * 5;
            const opacity = neonGridOpacity * (1 - (i / 20) * 0.5);
            neonGrid += `<line x1="0" y1="${y}%" x2="100%" y2="${y}%" stroke="rgba(255,0,255,${opacity})" stroke-width="1"/>`;
        }
        for (let i = 0; i < 20; i++) {
            const x = i * 10;
            const opacity = neonGridOpacity * 0.5;
            neonGrid += `<line x1="${x}%" y1="50%" x2="${x}%" y2="100%" stroke="rgba(0,255,255,${opacity})" stroke-width="1"/>`;
        }
    }

    // Buildings silhouette
    const buildingColor = progress < 0.5
        ? `rgb(${colors.santoriniWhite.r}, ${colors.santoriniWhite.g}, ${colors.santoriniWhite.b})`
        : `rgb(20, 20, 30)`;

    const buildingOpacity = 0.3 + Math.abs(progress - 0.5) * 0.4;

    return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${WIDTH}" height="${HEIGHT}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <!-- Background gradient -->
    <linearGradient id="bgGradient" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" style="stop-color:rgb(${bgTop.r},${bgTop.g},${bgTop.b})"/>
      <stop offset="50%" style="stop-color:rgb(${bgMid.r},${bgMid.g},${bgMid.b})"/>
      <stop offset="100%" style="stop-color:rgb(${bgBottom.r},${bgBottom.g},${bgBottom.b})"/>
    </linearGradient>
    
    <!-- Sun/Moon gradient -->
    <radialGradient id="sunGradient" cx="50%" cy="50%" r="50%">
      <stop offset="0%" style="stop-color:rgb(255,255,240)"/>
      <stop offset="50%" style="stop-color:rgb(${colors.santoriniSun.r},${colors.santoriniSun.g},${colors.santoriniSun.b})"/>
      <stop offset="100%" style="stop-color:rgba(255,150,50,0)"/>
    </radialGradient>
    
    <!-- Neon glow filters -->
    <filter id="neonGlow" x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur stdDeviation="30" result="blur"/>
      <feMerge>
        <feMergeNode in="blur"/>
        <feMergeNode in="blur"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
    
    <filter id="softGlow" x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur stdDeviation="60" result="blur"/>
      <feMerge>
        <feMergeNode in="blur"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
  </defs>
  
  <!-- Background -->
  <rect width="100%" height="100%" fill="url(#bgGradient)"/>
  
  <!-- Stars (night scene) -->
  <g>${stars}</g>
  
  <!-- Neon grid (Tokyo) -->
  <g opacity="${neonGridOpacity}">${neonGrid}</g>
  
  <!-- Sun (Santorini) -->
  <g opacity="${sunOpacity}" filter="url(#softGlow)">
    <circle cx="50%" cy="${sunY}%" r="${80 * sunScale}" fill="url(#sunGradient)"/>
  </g>
  
  <!-- Neon glow orbs (Tokyo) -->
  <g opacity="${glowOpacity}" filter="url(#neonGlow)">
    <ellipse cx="${glowX1}%" cy="${glowY1}%" rx="200" ry="200" fill="rgba(255,0,255,0.4)"/>
    <ellipse cx="${glowX2}%" cy="${glowY2}%" rx="180" ry="180" fill="rgba(0,255,255,0.3)"/>
    <ellipse cx="50%" cy="50%" rx="250" ry="150" fill="rgba(255,20,147,0.2)"/>
  </g>
  
  <!-- City silhouette / Buildings -->
  <g opacity="${buildingOpacity}">
    <path d="M0,${HEIGHT} 
             L0,${HEIGHT * 0.7} 
             L${WIDTH * 0.05},${HEIGHT * 0.65} 
             L${WIDTH * 0.08},${HEIGHT * 0.72} 
             L${WIDTH * 0.12},${HEIGHT * 0.58} 
             L${WIDTH * 0.16},${HEIGHT * 0.68} 
             L${WIDTH * 0.2},${HEIGHT * 0.55} 
             L${WIDTH * 0.25},${HEIGHT * 0.62} 
             L${WIDTH * 0.3},${HEIGHT * 0.5} 
             L${WIDTH * 0.35},${HEIGHT * 0.58} 
             L${WIDTH * 0.4},${HEIGHT * 0.48} 
             L${WIDTH * 0.45},${HEIGHT * 0.55} 
             L${WIDTH * 0.5},${HEIGHT * 0.45} 
             L${WIDTH * 0.55},${HEIGHT * 0.52} 
             L${WIDTH * 0.6},${HEIGHT * 0.48} 
             L${WIDTH * 0.65},${HEIGHT * 0.56} 
             L${WIDTH * 0.7},${HEIGHT * 0.52} 
             L${WIDTH * 0.75},${HEIGHT * 0.6} 
             L${WIDTH * 0.8},${HEIGHT * 0.54} 
             L${WIDTH * 0.85},${HEIGHT * 0.65} 
             L${WIDTH * 0.9},${HEIGHT * 0.58} 
             L${WIDTH * 0.95},${HEIGHT * 0.68} 
             L${WIDTH},${HEIGHT * 0.72} 
             L${WIDTH},${HEIGHT} Z" 
          fill="${buildingColor}"/>
  </g>
  
  <!-- Vignette overlay -->
  <rect width="100%" height="100%" fill="url(#vignette)" opacity="0.3">
    <defs>
      <radialGradient id="vignette" cx="50%" cy="50%" r="70%">
        <stop offset="0%" style="stop-color:transparent"/>
        <stop offset="100%" style="stop-color:rgba(0,0,0,0.6)"/>
      </radialGradient>
    </defs>
  </rect>
  
  <!-- Film grain texture overlay -->
  <filter id="noise">
    <feTurbulence type="fractalNoise" baseFrequency="0.7" numOctaves="3" result="noise"/>
    <feColorMatrix type="saturate" values="0"/>
    <feBlend in="SourceGraphic" in2="noise" mode="overlay"/>
  </filter>
  <rect width="100%" height="100%" filter="url(#noise)" opacity="0.05"/>
</svg>`;
}

// Generate all frames
async function generateAllFrames() {
    console.log(`🎬 Generating ${TOTAL_FRAMES} frames for Seda & Olivo scrollytelling...`);
    console.log(`   Resolution: ${WIDTH}x${HEIGHT}`);
    console.log(`   Output: ${framesDir}\n`);

    for (let i = 0; i < TOTAL_FRAMES; i++) {
        const frameNumber = String(i + 1).padStart(3, '0');
        const filename = `frame_${frameNumber}.png`;
        const filepath = join(framesDir, filename);

        try {
            const svg = generateFrameSVG(i);

            await sharp(Buffer.from(svg))
                .png({ quality: 90, compressionLevel: 6 })
                .toFile(filepath);

            const progress = Math.round(((i + 1) / TOTAL_FRAMES) * 100);
            process.stdout.write(`\r   Progress: ${progress}% (${i + 1}/${TOTAL_FRAMES})`);

        } catch (err) {
            console.error(`\n   ❌ Error generating frame ${frameNumber}:`, err.message);
        }
    }

    console.log('\n\n✅ All frames generated successfully!');
    console.log('   Run "npm run dev" to rebuild the manifest and see the effect.');
}

// Run
generateAllFrames().catch(console.error);
