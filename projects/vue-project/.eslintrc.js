require('@rushstack/eslint-patch/modern-module-resolution');

module.exports = {
    root: false,
    extends: [
        '../../.eslintrc.json',
        'plugin:vue/vue3-essential',
        '@vue/eslint-config-typescript',
        '@vue/eslint-config-prettier',
    ],
    parserOptions: {
        ecmaVersion: 'latest',
    },
    rules: {
        'vue/multi-word-component-names': 'off',
    },
    ignorePatterns: ['src/index.html'],
};
