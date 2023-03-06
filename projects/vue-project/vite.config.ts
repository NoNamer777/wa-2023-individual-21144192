/// <reference types="vitest" />
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { fileURLToPath } from 'url';
import checker from 'vite-plugin-checker';

export default defineConfig({
    assetsInclude: ['./src/favicon.ico', './src/assets/**/*'],
    base: process.env.DEPLOYING ? '/wa-2023-individual-21144192/' : '/',
    build: {
        emptyOutDir: true,
        outDir: '../../../dist/vue-project',
        sourcemap: true,
    },
    cacheDir: '../../../.vite',
    mode: 'production',
    plugins: [vue(), checker({ vueTsc: true, eslint: { lintCommand: 'eslint "**/*{.js,ts,vue,html}"' } })],
    publicDir: './assets',
    preview: {
        host: true,
        port: 4200,
        strictPort: true,
    },
    resolve: {
        alias: {
            '@vue-project': fileURLToPath(new URL('./src', import.meta.url)),
            '~bootstrap': fileURLToPath(new URL('../../node_modules/bootstrap', import.meta.url)),
        },
    },
    root: './src',
    server: {
        host: true,
        port: 4200,
        strictPort: true,
    },
    test: {
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
            reportsDirectory: '../../../coverage/vue-project',
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
    },
});
