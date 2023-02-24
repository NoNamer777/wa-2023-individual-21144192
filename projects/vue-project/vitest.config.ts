import { defineConfig } from 'vitest/config';

export default defineConfig({
    test: {
        allowOnly: true,
        cache: {
            dir: '../../.vitest',
        },
        coverage: {
            branches: 80,
            clean: true,
            cleanOnRerun: true,
            enabled: true,
            functions: 80,
            lines: 80,
            provider: 'istanbul',
            reporter: ['text', 'json', 'html'],
            reportsDirectory: '../../coverage',
            statements: 80,
        },
        environment: 'jsdom',
        include: ['./src/app/**/*.spec.ts'],
        mockReset: true,
        passWithNoTests: true,
        root: './src',
        sequence: {
            shuffle: true,
        },
    },
});
