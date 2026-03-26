const baseConfig = require('../../eslint.config.js');

module.exports = [
  ...baseConfig,
  {
    files: ['**/*.ts'],
    rules: {
      '@angular-eslint/prefer-on-push-component-change-detection': 'off',
      '@angular-eslint/prefer-signals': 'off',
    },
  },
  {
    files: ['**/*.stories.ts'],
    rules: {
      '@typescript-eslint/no-unused-vars': 'off',
    },
  },
];
