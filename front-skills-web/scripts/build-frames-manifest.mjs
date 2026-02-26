/**
 * Build script to generate frames manifest for production
 * Reads /frames directory and creates public/frames/manifest.json
 */

import { readdirSync, writeFileSync, mkdirSync, existsSync, copyFileSync } from 'fs';
import { join, extname, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = join(__dirname, '..');
const framesDir = join(rootDir, 'frames');
const publicFramesDir = join(rootDir, 'public', 'frames');
const manifestPath = join(publicFramesDir, 'manifest.json');

// Supported image extensions
const SUPPORTED_EXTENSIONS = ['.png', '.jpg', '.jpeg', '.webp'];

/**
 * Extract number from filename for sorting
 */
function extractNumber(filename) {
    // Try to match the last number before the extension (e.g. name_001.jpg)
    const match = filename.match(/_(\d+)\.[^.]+$/);
    if (match) {
        return parseInt(match[1], 10);
    }

    // Fallback: match first number
    const firstMatch = filename.match(/(\d+)/);
    return firstMatch ? parseInt(firstMatch[1], 10) : null;
}

/**
 * Sort files by number in filename, fallback to alphabetical
 */
function sortFiles(files) {
    return files.sort((a, b) => {
        const numA = extractNumber(a);
        const numB = extractNumber(b);

        // Both have numbers - sort numerically
        if (numA !== null && numB !== null) {
            return numA - numB;
        }

        // Only one has number - numbered files first
        if (numA !== null) return -1;
        if (numB !== null) return 1;

        // Neither has number - sort alphabetically
        return a.localeCompare(b);
    });
}

/**
 * Main build function
 */
function buildFramesManifest() {
    console.log('🎬 Building frames manifest...');

    // Check if frames directory exists
    if (!existsSync(framesDir)) {
        console.warn('⚠️  /frames directory not found. Creating empty manifest.');
        if (!existsSync(publicFramesDir)) {
            mkdirSync(publicFramesDir, { recursive: true });
        }
        writeFileSync(manifestPath, JSON.stringify([]));
        return;
    }

    // Read all files from frames directory
    const allFiles = readdirSync(framesDir);

    // Filter for supported image extensions
    const imageFiles = allFiles.filter(file => {
        const ext = extname(file).toLowerCase();
        return SUPPORTED_EXTENSIONS.includes(ext);
    });

    if (imageFiles.length === 0) {
        console.warn('⚠️  No image files found in /frames directory.');
        if (!existsSync(publicFramesDir)) {
            mkdirSync(publicFramesDir, { recursive: true });
        }
        writeFileSync(manifestPath, JSON.stringify([]));
        return;
    }

    // Sort files
    const sortedFiles = sortFiles(imageFiles);

    // Ensure public/frames directory exists
    if (!existsSync(publicFramesDir)) {
        mkdirSync(publicFramesDir, { recursive: true });
    }

    // Copy files to public/frames and build manifest
    const manifest = sortedFiles.map(file => {
        const sourcePath = join(framesDir, file);
        const destPath = join(publicFramesDir, file);

        // Copy file to public directory
        copyFileSync(sourcePath, destPath);

        // Return public URL path
        return `/frames/${file}`;
    });

    // Write manifest
    writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));

    console.log(`✅ Generated manifest with ${manifest.length} frames`);
    console.log(`   First frame: ${manifest[0]}`);
    console.log(`   Last frame: ${manifest[manifest.length - 1]}`);
}

// Run the build
buildFramesManifest();