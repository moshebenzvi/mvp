import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import laravel from 'laravel-vite-plugin';
import { resolve } from 'node:path';
import { defineConfig } from 'vite';

export default defineConfig({
    base: '/ranking/', // Add this line for subdirectory deployment
    // server: {
    //     host: 'dikpora.trenggalekkab.go.id',
    //     port: 5173,
    //     proxy: {
    //         '/sipringis': {
    //             target: 'dikpora.trenggalekkab.go.id',
    //             changeOrigin: true,
    //             rewrite: (path) => path.replace(/^\/ranking/, ''),
    //         },
    //     },
    // },
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
        alias: {
            'ziggy-js': resolve(__dirname, 'vendor/tightenco/ziggy'),
        },
    },
    build: {
        outDir: 'public/build', // Must match Laravel's default
    },
});
