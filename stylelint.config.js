module.exports = {
  plugins: ['stylelint-prettier', 'stylelint-order'],
  rules: {
    'prettier/prettier': true,
    'order/properties-alphabetical-order': true,
  },
  ignoreFiles: ['coverage/**/*.css', 'storybook-static/**/*.css'],
  overrides: [
    { files: ['*.scss'], customSyntax: 'postcss-scss' },
  ],
};
