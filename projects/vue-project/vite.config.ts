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
    plugins: [vue(), checker({ vueTsc: { root: './' }, eslint: { lintCommand: 'npm run lint' } })],
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
});
