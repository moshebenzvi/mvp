import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import laravel from 'laravel-vite-plugin';
import { defineConfig } from 'vite';

export default defineConfig({
    base: '/ranking/', // Add this line for subdirectory deployment
    plugins: [
        laravel({
            input: ['resources/css/app.css', 'resources/js/app.tsx'],
            ssr: 'resources/js/ssr.tsx',
            refresh: true,
        }),
        react(),
        tailwindcss(),
    ],
    esbuild: {
        jsx: 'automatic',
        supported: {
            'top-level-await': true,
        },
    },
    resolve: {
        alias: {},
    },
    build: {
        outDir: 'public/build', // Must match Laravel's default
    },
});
