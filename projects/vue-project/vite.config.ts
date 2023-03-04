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
    plugins: [vue(), checker({ vueTsc: true, eslint: { lintCommand: 'eslint "**/*{.js,ts,vue,html}"' } })],
    publicDir: './assets',
    mode: 'production',
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
    preview: {
        host: true,
        port: 4200,
        strictPort: true,
    },
    test: {
        cache: {
            dir: '../../../.vitest',
        },
        coverage: {
            branches: 80,
            clean: true,
            cleanOnRerun: true,
            enabled: true,
            exclude: ['testing/**/*'],
            functions: 80,
            lines: 80,
            provider: 'istanbul',
            reporter: ['text', 'json', 'html'],
            reportsDirectory: '../../../coverage',
            statements: 80,
        },
        environment: 'jsdom',
        globals: true,
        include: ['**/*.spec.ts'],
        mockReset: true,
        passWithNoTests: true,
        sequence: {
            shuffle: true,
        },
    },
});
