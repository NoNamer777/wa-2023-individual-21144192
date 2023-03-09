require('@rushstack/eslint-patch/modern-module-resolution');

module.exports = {
    extends: [
        '../../.eslintrc.json',
        'plugin:vue/vue3-essential',
        '@vue/eslint-config-typescript',
        '@vue/eslint-config-prettier',
    ],
    root: false,
    ignorePatterns: ['!**/*'],
    rules: {
        'vue/multi-word-component-names': 'off',
    },
    overrides: [
        {
            files: ['*.js', '*.ts', '*.vue'],
            rules: {},
        },
        {
            files: ['*.js'],
            rules: {},
        },
        {
            files: ['*.ts'],
            rules: {},
        },
        {
            files: ['*.vue'],
            rules: {},
        },
    ],
};
