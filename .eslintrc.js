const { resolve } = require('path');

module.exports = {
  extends: ['airbnb', 'prettier'],
  // parser: 'babel-eslint',
  parser: '@typescript-eslint/parser',
  root: true,
  plugins: ['monorepo'],
  parserOptions: {
    ecmaVersion: 9,
    sourceType: 'module',
    allowImportExportEverywhere: true,
    jsx: true,
  },
  env: {
    browser: true,
  },
  globals: {
    document: true,
    window: true,
  },
  rules: {
    'no-plusplus': ['error', { allowForLoopAfterthoughts: true }],
    'react/jsx-filename-extension': 0,
    'react/prefer-stateless-function': 0,
    'import/extensions': 0, // this seemed to be broken, so we're turning it off
    'monorepo/no-internal-import': 'error',
    'monorepo/no-relative-import': 0,
    'import/no-extraneous-dependencies': 0, // ['error', { packageDir: './' }],
    'react/jsx-one-expression-per-line': 0,
    'react/destructuring-assignment': 0,
    'react/sort-comp': 0,
    'no-undef': 0,
    'no-restricted-globals': 0,
    'no-unused-vars': 0, // typescript will take care of this
    'react/button-has-type': 0, // we're dynamically passing these types in a way they're always set
    'jsx-a11y/label-has-for': 0, // rule is deprecated
    'jsx-a11y/label-has-associated-control': 'error',
    // So, for now, we're just turning off prop types. We might turn this back on and add them
    'react/prop-types': 0,
    'react/no-multi-comp': 0,
  },
  settings: {
    'import/resolver': {
      'eslint-import-resolver-lerna': {
        packages: resolve(__dirname, 'packages'),
      },
      'eslint-import-resolver-typescript': true,
    },
  },
};
