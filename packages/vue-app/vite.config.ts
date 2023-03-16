/// <reference types="vitest" />
import vue from '@vitejs/plugin-vue';
import { fileURLToPath } from 'url';
import { defineConfig } from 'vite';

export default defineConfig({
    assetsInclude: ['./src/favicon.ico', './src/assets/**/*'],
    base: process.env.DEPLOYING ? '/wa-2023-individual-21144192/' : '/',
    build: {
        assetsDir: './assets',
        emptyOutDir: true,
        manifest: true,
        minify: true,
        outDir: '../../../dist/vue-app',
        reportCompressedSize: false,
        sourcemap: true,
    },
    cacheDir: '../../../.vite',
    css: {
        devSourcemap: true,
    },
    mode: 'production',
    plugins: [vue()],
    publicDir: './assets',
    preview: {
        host: true,
        port: 4200,
        strictPort: true,
    },
    resolve: {
        alias: {
            '@dnd-mapp/client': fileURLToPath(new URL('./src/app/index.ts', import.meta.url)),
            '@dnd-mapp/data': fileURLToPath(new URL('../app-data/src/index.ts', import.meta.url)),
            '~bootstrap': fileURLToPath(new URL('../../node_modules/bootstrap', import.meta.url)),
        },
    },
    root: 'packages/vue-app/src',
    server: {
        host: true,
        open: false,
        port: 4200,
        strictPort: true,
    },
    test: {
        allowOnly: true,
        cache: false,
        coverage: {
            branches: 80,
            clean: true,
            cleanOnRerun: true,
            enabled: true,
            exclude: ['testing/**/*'],
            functions: 80,
            lines: 80,
            provider: 'istanbul',
            reporter: ['html', 'text-summary'],
            reportsDirectory: '../../../coverage/vue-app',
            statements: 80,
        },
        css: true,
        environment: 'jsdom',
        globals: true,
        include: ['**/*.spec.ts'],
        mockReset: true,
        passWithNoTests: true,
        reporters: ['dot'],
        sequence: {
            shuffle: true,
        },
        watch: false,
    },
});
