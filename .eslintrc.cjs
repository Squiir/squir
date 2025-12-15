module.exports = {
  root: true,
  ignorePatterns: ['**/node_modules/**', '**/dist/**', '**/.expo/**', '**/coverage/**'],
  extends: ['expo', 'plugin:jsonc/recommended-with-json'],
  plugins: ['jsonc'],
  overrides: [
    {
      files: ['apps/web/**/*.{ts,tsx}'],
      extends: ['plugin:jsx-a11y/recommended'],
    },
    {
      files: ['**/*.json'],
      parser: 'jsonc-eslint-parser',
    },
    {
      files: ['**/*.{test,spec}.{ts,tsx,js,jsx}'],
      env: {
        jest: true,
      },
    },
  ],
};
