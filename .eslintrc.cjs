module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', 'dev-dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],

    // Disable the rule that enforces only exporting components
    'react-refresh/only-export-components': 'off',

    // Disable the rule that warns about the use of `Function` type
    '@typescript-eslint/no-unsafe-function-type': 'off',

    // Disable the rule that warns about `any` type usage
    '@typescript-eslint/no-explicit-any': 'off',

    // Disable the rule that warns about unused variables
    '@typescript-eslint/no-unused-vars': 'off',

    // Disable the rule that enforces including dependencies in useEffect
    'react-hooks/exhaustive-deps': 'off',

    // Disable the rule that warns about `module` not being defined
    'no-undef': 'off',
    '@typescript-eslint/ban-ts-comment': 'off',
    '@typescript-eslint/no-unused-expressions': 'off',
    'no-empty': 'off',
    '@typescript-eslint/ban-types': 'off',
    'no-constant-condition': 'off',
    'no-cond-assign': 'off',
  },

}