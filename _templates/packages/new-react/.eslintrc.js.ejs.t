---
to: packages/<%= name %>/.eslintrc.js
---

module.exports = {
  extends: ['../../.eslintrc.js'],
  ignorePatterns: ['!**/*'],
  overrides: [
    {
      files: ['*.ts', '*.tsx', '*.js', '*.jsx'],
      plugins: ['react', 'react-hooks'],
      rules: {
        // react-hooks
        'react-hooks/rules-of-hooks': 'error',
        'react-hooks/exhaustive-deps': 'error',
      },
    },
  ],
};
