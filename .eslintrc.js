module.exports = {
  root: true,
  ignorePatterns: '**/*',
  overrides: [
    {
      files: ['*.ts', '*.tsx', '*.js', '*.jsx'],
      parser: '@typescript-eslint/parser',
      env: { es6: true, node: true, browser: true },
      plugins: ['import', 'unused-imports', 'prettier'],
      rules: {
        curly: ['warn', 'multi-line', 'consistent'],
        'no-console': 'off',
        'no-empty-pattern': 'warn',
        'no-unused-vars': 'off',
        'no-debugger': 'error',
        'no-duplicate-imports': 'error',
        'import/export': 'error',
        'import/named': 'off',
        'import/namespace': 'off',
        'import/default': 'off',
        'import/no-named-as-default-member': 'off',
        'import/order': [
          'error',
          {
            groups: ['builtin', 'external', ['parent', 'sibling'], 'index'],
            'newlines-between': 'always',
            warnOnUnassignedImports: true,
            alphabetize: { order: 'asc', caseInsensitive: true },
          },
        ],
        'unused-imports/no-unused-imports': 'error',
        'unused-imports/no-unused-vars': [
          'error',
          {
            vars: 'all',
            varsIgnorePattern: '^_',
            args: 'after-used',
            argsIgnorePattern: '^_',
          },
        ],
      },
    },
    {
      files: ['*.ts', '*.tsx'],
      parserOptions: {
        ecmaVersion: 2018,
        sourceType: 'module',
        ecmaFeatures: { jsx: true },
      },
      plugins: ['@typescript-eslint'],
      rules: {
        '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        '@typescript-eslint/no-use-before-define': 'off',
        '@typescript-eslint/no-empty-function': 'off',
        '@typescript-eslint/no-empty-interface': 'off',
        '@typescript-eslint/no-explicit-any': 'warn',
      },
    },
    { files: ['*.js', '*.jsx'], extends: [], rules: {} },
  ],
};
