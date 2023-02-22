import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import { fileURLToPath } from 'url';

// https://vitejs.dev/config/
export default defineConfig({
    assetsInclude: ['./src/favicon.ico', './src/assets/**/*'],
    build: {
        emptyOutDir: true,
        outDir: '../../../dist/vue-project',
        sourcemap: true,
    },
    cacheDir: '../../../.vite',
    plugins: [vue(), vueJsx()],
    publicDir: './assets',
    mode: 'production',
    resolve: {
        alias: {
            '@vue-project': fileURLToPath(new URL('./src', import.meta.url)),
            '~bootstrap': fileURLToPath(new URL('../../node_modules/bootstrap', import.meta.url)),
        },
    },
    root: './src',
});
