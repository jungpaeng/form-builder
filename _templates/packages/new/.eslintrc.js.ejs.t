---
to: packages/<%= name %>/.eslintrc.js
---

module.exports = {
  extends: ['../../.eslintrc.js'],
  ignorePatterns: ['!**/*'],
  overrides: [
    {
      files: ['*.ts', '*.js'],
      plugins: [],
      rules: {},
    },
  ],
};
