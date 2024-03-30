const { resolve } = require('path');
const { config } = require('dotenv');

config();

module.exports = {
  root: true,
  env: {
    browser: true,
    es6: true,
    node: true,
    jest: true,
  },
  extends: ['plugin:react/recommended', 'airbnb'],
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
              '@server': resolve(__dirname, './src/server'),
              '@shared': resolve(__dirname, './src/shared'),
              '@e2e': resolve(__dirname, './src/e2e'),
            },
          },
        },
      },
    },
  },
  plugins: ['react'],
  rules: {
    'react/jsx-max-props-per-line': ['error', { maximum: 1 }],
    'react/jsx-filename-extension': 0,
    'react/jsx-one-expression-per-line': 0,
    'react/jsx-props-no-spreading': 0,
    'react/jsx-indent': ['error', 2],
    'react/react-in-jsx-scope': 0,
    'import/prefer-default-export': 0,
    'no-underscore-dangle': 0,
    camelcase: 0,
    'no-param-reassign': 0,
    'consistent-return': 0,
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'jsx-a11y/label-has-associated-control': [
      'error',
      {
        required: {
          some: ['nesting', 'id'],
        },
      },
    ],
    'jsx-a11y/label-has-for': [
      'error',
      {
        required: {
          some: ['nesting', 'id'],
        },
      },
    ],
    'max-len': [
      'error',
      100,
      2,
      {
        ignoreUrls: true,
        ignoreComments: false,
        ignoreRegExpLiterals: true,
        ignoreStrings: true,
        ignoreTemplateLiterals: true,
      },
    ],
    'import/extensions': [
      'error',
      'always',
      {
        js: 'never',
        mjs: 'never',
        jsx: 'never',
      },
    ],
  },
  overrides: [
    {
      files: ['src/e2e/**/*.js'],
      env: { 'cypress/globals': true },
      plugins: ['cypress'],
      rules: {
        'no-unused-expressions': 0,
      },
    },
    {
      extends: ['plugin:jsonc/recommended-with-json'],
      files: ['src/**/*.json'],
      parser: 'jsonc-eslint-parser',
    },
    {
      files: ['src/client/utils/testUtils/**/*.{jsx,js}'],
      rules: {
        'import/no-extraneous-dependencies': 0,
        'react/prop-types': 0,
      },
    },
    {
      files: ['.storybook/**/*.js'],
      rules: {
        'import/no-extraneous-dependencies': 0,
      },
    },
  ],
};
