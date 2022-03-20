module.exports = {
  presets: ['@babel/preset-env', '@babel/preset-react'],
  plugins: [
    '@babel/plugin-syntax-dynamic-import',
    '@babel/plugin-proposal-nullish-coalescing-operator',
    '@babel/plugin-proposal-optional-chaining',
    '@babel/plugin-transform-runtime',
  ],
  env: {
    development: {
      plugins: [['babel-plugin-webpack-alias', { config: './webpack/webpack.config.server.js' }]],
    },
    production: {
      plugins: [['babel-plugin-webpack-alias', { config: './webpack/webpack.config.server.js' }]],
    },
  },
};
