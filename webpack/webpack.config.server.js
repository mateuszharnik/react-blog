const { join, resolve } = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  entry: {
    server: './src/server/index.js',
  },
  output: {
    filename: '[name].js',
    chunkFilename: '[name].js',
    path: join(__dirname, '../dist/server'),
    publicPath: '/',
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      '@server': resolve(__dirname, '../src/server'),
      '@client': resolve(__dirname, '../src/client'),
      '@shared': resolve(__dirname, '../src/shared'),
      '@e2e': resolve(__dirname, '../src/e2e'),
    },
  },
  target: 'node',
  node: {
    __dirname: false,
  },
  externals: [nodeExternals()],
  devtool: 'production',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new ESLintPlugin({
      context: './',
      extensions: ['js', 'json'],
    }),
  ],
};
