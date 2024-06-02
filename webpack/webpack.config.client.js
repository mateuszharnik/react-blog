const webpack = require('webpack');
const colors = require('colors/safe');
const address = require('address');
const Joi = require('joi');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const StylelintPlugin = require('stylelint-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');
const RemoveEmptyScriptsPlugin = require('webpack-remove-empty-scripts');
const PreloadWebpackPlugin = require('@vue/preload-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('@soda/friendly-errors-webpack-plugin');
const { join, resolve } = require('path');
const { existsSync } = require('fs');
const { config } = require('dotenv');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { sentryWebpackPlugin } = require('@sentry/webpack-plugin');
const { version } = require('../package.json');

config();

// Set USE_SEPARATE_ENVIRONMENTS to true in the
// .env file to use env specific environments variables
if (process.env.USE_SEPARATE_ENVIRONMENTS === 'true') {
  const path = resolve(process.cwd(), `.env.${process.env.APP_ENV}`);

  if (existsSync(path)) config({ path });
}

const schema = Joi.object({
  NODE_ENV: Joi.string()
    .trim()
    .valid('development', 'production', 'test')
    .required(),
  APP_ENV: Joi.string()
    .trim()
    .valid('development', 'production', 'test', 'e2e', 'staging', 'testing')
    .required(),
  CLIENT_PORT: Joi.string().trim(),
  DEVTOOLS_ENABLED: Joi.bool().required(),
  BASE_URL: Joi.string().trim().required(),
  SERVER_URL: Joi.string().trim().required(),
  CLIENT_URL: Joi.string().trim().required(),
  SENTRY_DSN: Joi.string().trim().allow('').required(),
  SENTRY_ORGANIZATION_NAME: Joi.string().trim().allow('').required(),
  SENTRY_PROJECT_NAME: Joi.string().trim().allow('').required(),
  SENTRY_AUTH_TOKEN: Joi.string().trim().allow('').required(),
}).unknown(true);

module.exports = (webpackEnv, { mode }) => {
  const { error, value: env } = schema.validate(process.env);

  if (error) {
    console.error(colors.red(`Missing property in config file: ${error.message}`));
    process.exit(1);
  }

  const isProduction = mode === 'production';

  // Use this plugins only in production mode
  const productionPlugins = isProduction ? [
    new CleanWebpackPlugin(),
    new RemoveEmptyScriptsPlugin(),
    new CopyPlugin({
      patterns: [
        { from: './public/favicon-*.png', to: '[name].png' },
        { from: './public/app.png', to: 'app.png' },
        { from: './public/manifest.json', to: 'manifest.json' },
      ],
    }),
  ] : [];

  // Use this plugins only in development mode
  const developmentPlugins = !isProduction ? [
    new FriendlyErrorsWebpackPlugin({
      compilationSuccessInfo: {
        messages: [`Your application is running here: \n
  - Local: ${colors.cyan(`http://localhost:${env.CLIENT_PORT}`)}
  - Network: ${colors.cyan(`http://${address.ip()}:${env.CLIENT_PORT}`)}
  `],
      },
      clearConsole: true,
    }),
  ] : [];

  // Use Sentry plugin only if APP_ENV is equal production and we specify SENTRY_DSN
  const sentryPlugin = env.APP_ENV === 'production' && env.SENTRY_DSN ? [
    sentryWebpackPlugin({
      org: env.SENTRY_ORGANIZATION_NAME,
      project: env.SENTRY_PROJECT_NAME,
      authToken: env.SENTRY_AUTH_TOKEN,
      release: version,
      include: './dist/client',
      ignore: ['node_modules'],
      telemetry: false,
    }),
  ] : [];

  const cssLibsEntry = 'css-libs';
  const jsLibsEntry = 'js-libs';
  const appEntry = 'app';

  return {
    entry: {
      // Entry for all css libs, this will be clean by using purgecss
      [cssLibsEntry]: './src/client/libs.scss',
      [appEntry]: './src/client/index.js',
    },
    output: {
      filename: 'js/[name].js',
      chunkFilename: 'js/[name].js',
      path: join(__dirname, '../dist/client'),
      publicPath: '/',
    },
    resolve: {
      extensions: ['.js', '.jsx'],
      alias: {
        '@client': resolve(__dirname, '../src/client'),
        '@server': resolve(__dirname, '../src/server'),
        '@shared': resolve(__dirname, '../src/shared'),
        '@e2e': resolve(__dirname, '../src/e2e'),
      },
    },
    devtool: isProduction ? 'hidden-source-map' : 'source-map',
    stats: 'errors-warnings',
    devServer: {
      host: '0.0.0.0',
      compress: true,
      hot: true,
      historyApiFallback: true,
      open: false,
      port: env.CLIENT_PORT,
      client: {
        overlay: {
          warnings: false,
          errors: true,
          runtimeErrors: false,
        },
      },
      proxy: [{ context: ['/api'], target: env.SERVER_URL }],
    },
    optimization: {
      minimize: isProduction,
      minimizer: [
        new TerserPlugin({ extractComments: false }),
        new CssMinimizerPlugin({
          minify: CssMinimizerPlugin.cleanCssMinify,
          minimizerOptions: { level: 2, rebase: false },
        }),
        new ImageMinimizerPlugin({
          test: /\.(jpe?g|png|gif|svg)$/i,
          minimizer: {
            implementation: ImageMinimizerPlugin.imageminMinify,
            options: {
              plugins: [
                ['gifsicle', { interlaced: true }],
                ['jpegtran', { progressive: true }],
                ['optipng', { optimizationLevel: 5 }],
                ['svgo', {
                  plugins: [{
                    name: 'preset-default',
                    params: {
                      overrides: {
                        removeViewBox: false,
                        addAttributesToSVGElement: {
                          params: { attributes: [{ xmlns: 'http://www.w3.org/2000/svg' }] },
                        },
                      },
                    },
                  }],
                }],
              ],
            },
          },
        }),
      ],
      // Setting runtimeChunk as single gives ability to hmr with multiple entries
      runtimeChunk: isProduction ? false : 'single',
      splitChunks: {
        name: (_, chunks) => `${chunks
          .map((item) => item.name)
          .sort()
          .join('~')}`,
        cacheGroups: {
          // File for all js libs
          libs: {
            test: /[\\/]node_modules[\\/].+\.(?!(css|scss|less|sass|styl)).*$/,
            chunks: 'initial',
            name: jsLibsEntry,
            enforce: true,
          },
        },
      },
    },
    module: {
      rules: [
        {
          test: /\.scss$/,
          exclude: /(node_modules|bower_components)/,
          use: [
            isProduction
              ? { loader: MiniCssExtractPlugin.loader, options: { publicPath: '../' } }
              : { loader: 'style-loader' },
            { loader: 'css-loader', options: { sourceMap: true } },
            { loader: 'postcss-loader', options: { sourceMap: true } },
            { loader: 'sass-loader', options: { sourceMap: true } },
          ],
        },
        {
          test: /\.css$/,
          exclude: /(node_modules|bower_components)/,
          use: [
            isProduction
              ? { loader: MiniCssExtractPlugin.loader, options: { publicPath: '../' } }
              : { loader: 'style-loader' },
            { loader: 'css-loader', options: { sourceMap: true } },
            { loader: 'postcss-loader', options: { sourceMap: true } },
          ],
        },
        {
          test: /\.(js|jsx)$/,
          exclude: /(node_modules|bower_components)/,
          use: { loader: 'babel-loader' },
        },
        {
          test: /\.mjs$/,
          include: /(node_modules|bower_components)/,
          type: 'javascript/auto',
        },
        {
          test: /\.(png|jpe?g|gif|svg)$/,
          exclude: /(node_modules|bower_components|fonts)/,
          type: 'asset',
          generator: { filename: 'images/[name][ext]' },
        },
        {
          test: /\.(png|jpe?g|gif|svg|woff2?|ttf|eot)$/,
          exclude: /(images)/,
          type: 'asset',
          generator: { filename: 'fonts/[name][ext]' },
        },
      ],
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(env.NODE_ENV),
        'process.env.DEVTOOLS_ENABLED': JSON.stringify(env.DEVTOOLS_ENABLED),
        'process.env.BASE_URL': JSON.stringify(env.BASE_URL),
        'process.env.SERVER_URL': JSON.stringify(env.SERVER_URL),
        'process.env.CLIENT_URL': JSON.stringify(env.CLIENT_URL),
        'process.env.SENTRY_DSN': JSON.stringify(env.SENTRY_DSN),
        ...(!env.DEVTOOLS_ENABLED && isProduction && { __REACT_DEVTOOLS_GLOBAL_HOOK__: '({ isDisabled: true })' }),
      }),
      ...developmentPlugins,
      ...productionPlugins,
      ...sentryPlugin,
      new HTMLWebpackPlugin({
        inject: 'body',
        template: './public/index.html',
        filename: './index.html',
        scriptLoading: 'blocking',
        minify: {
          minifyCSS: true,
          minifyJS: true,
          sortAttributes: true,
          sortClassName: true,
          collapseWhitespace: true,
          conservativeCollapse: false,
          removeScriptTypeAttributes: true,
          removeStyleLinkTypeAttributes: true,
          removeAttributeQuotes: false,
        },
      }),
      new PreloadWebpackPlugin({
        rel: 'preload',
        fileBlacklist: [/\.(map|png|jpe?g|gif|svg|woff2?|ttf|eot)$/],
        include: { type: 'initial', entries: [jsLibsEntry, appEntry, cssLibsEntry] },
      }),
      new PreloadWebpackPlugin({
        rel: 'prefetch',
        fileBlacklist: [/\.(map|png|jpe?g|gif|svg|woff2?|ttf|eot)$/],
      }),
      new MiniCssExtractPlugin({
        filename: 'css/[name].css',
        chunkFilename: 'css/[name].css',
      }),
      new StylelintPlugin({
        failOnError: isProduction,
        failOnWarning: isProduction,
        context: './',
        extensions: ['css', 'scss'],
        files: ['src/client'],
      }),
      new ESLintPlugin({
        failOnError: isProduction,
        failOnWarning: isProduction,
        context: './',
        extensions: ['js', 'jsx', 'json'],
      }),
    ],
  };
};
