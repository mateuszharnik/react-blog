const { resolve } = require('path');

module.exports = {
  root: true,
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
  ],
  parser: '@babel/eslint-parser',
  parserOptions: {
    requireConfigFile: false,
    babelOptions: {
      presets: ['@babel/preset-react'],
    },
    ecmaFeatures: { jsx: true },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  settings: {
    'import/resolver': {
      node: {},
      webpack: {
        config: {
          resolve: {
            extensions: ['.jsx', '.js'],
            alias: {
              '@client': resolve(__dirname, './src/client'),
            },
          },
        },
      },
    },
  },
  plugins: ['react'],
  rules: {
    'react/jsx-filename-extension': 0,
    'react/jsx-one-expression-per-line': 0,
    'react/jsx-props-no-spreading': 0,
    'react/jsx-indent': ['error', 2],
    'no-underscore-dangle': 0,
    camelcase: 0,
    'consistent-return': 0,
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'max-len': ['error', 100, 2, {
      ignoreUrls: true,
      ignoreComments: false,
      ignoreRegExpLiterals: true,
      ignoreStrings: true,
      ignoreTemplateLiterals: true,
    }],
    'import/extensions': ['error', 'always', {
      js: 'never',
      jsx: 'never',
    }],
  },
};
