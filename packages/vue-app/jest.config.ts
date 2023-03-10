import type { Config } from 'jest';

const config: Config = {
    displayName: 'vue-app',
    preset: '../../jest.preset.js',
    transform: {
        '^.+.vue$': '@vue/vue3-jest',
        '.+.(css|styl|less|sass|scss|svg|png|jpg|ttf|woff|woff2)$': 'jest-transform-stub',
        '^.+.tsx?$': ['ts-jest', { tsconfig: '<rootDir>/tsconfig.spec.json' }],
    },
    moduleFileExtensions: ['ts', 'vue', 'js', 'json'],
    snapshotSerializers: ['jest-serializer-vue'],
    globals: {
        'vue-jest': {
            tsConfig: '<rootDir>/tsconfig.spec.json',
        },
    },
};

export default config;
