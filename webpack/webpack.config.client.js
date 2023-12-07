const { join, resolve } = require('path');
const { config } = require('dotenv');
const fs = require('fs');
const Joi = require('joi');
const colors = require('colors/safe');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const CleanCSS = require('clean-css');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const Imagemin = require('imagemin-webpack-plugin').default;
const PreloadWebpackPlugin = require('@vue/preload-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const StylelintPlugin = require('stylelint-webpack-plugin');
const FixStyleOnlyEntriesPlugin = require('webpack-fix-style-only-entries');
const SentryWebpackPlugin = require('@sentry/webpack-plugin');
const webpack = require('webpack');
const { version } = require('../package.json');

module.exports = (webpackEnv, { mode }) => {
  config();

  if (process.env.USE_SEPARATE_ENVIRONMENTS === 'true') {
    const path = resolve(process.cwd(), `.env.${process.env.APP_ENV}`);

    if (fs.existsSync(path)) {
      config({ path });
    }
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
    CLIENT_PORT: Joi.string()
      .trim(),
    DEVTOOLS_ENABLED: Joi.bool()
      .required(),
    BASE_URL: Joi.string()
      .trim()
      .required(),
    SERVER_URL: Joi.string()
      .trim()
      .required(),
    CLIENT_URL: Joi.string()
      .trim()
      .required(),
    SENTRY_DSN: Joi.string()
      .trim()
      .allow('')
      .required(),
    SENTRY_ORGANIZATION_NAME: Joi.string()
      .trim()
      .allow('')
      .required(),
    SENTRY_PROJECT_NAME: Joi.string()
      .trim()
      .allow('')
      .required(),
    SENTRY_AUTH_TOKEN: Joi.string()
      .trim()
      .allow('')
      .required(),
  }).unknown(true);

  const { error, value: env } = schema.validate(process.env);

  if (error) {
    console.error(colors.red(`Missing property in config file: ${error.message}`));
    process.exit(1);
  }

  return {
    entry: {
      styles: './src/client/libs.scss',
      app: './src/client/index.js',
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
    devtool: mode === 'production' ? 'hidden-source-map' : 'source-map',
    devServer: {
      compress: true,
      hot: true,
      historyApiFallback: true,
      open: true,
      port: env.CLIENT_PORT,
      quiet: true,
      overlay: {
        warnings: false,
        errors: true,
      },
      proxy: {
        '/api': env.SERVER_URL,
      },
    },
    optimization: {
      splitChunks: {
        name: (_, chunks) => `${chunks
          .map((item) => item.name)
          .sort()
          .join('~')}`,
        cacheGroups: {
          libs: {
            test: /[\\/]node_modules[\\/].+\.(?!(css|scss|sass)).*$/,
            chunks: 'initial',
            name: 'libs',
            enforce: true,
          },
        },
      },
    },
    module: {
      rules: [
        {
          test: /\.scss$/,
          exclude: /(node_modules|bower_components|\.module\.scss$)/,
          use: [
            mode === 'production'
              ? {
                loader: MiniCssExtractPlugin.loader,
                options: { publicPath: '../' },
              }
              : { loader: 'style-loader' },
            { loader: 'css-loader', options: { sourceMap: true } },
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: true,
                ident: 'postcss',
              },
            },
            { loader: 'sass-loader', options: { sourceMap: true } },
          ],
        },
        {
          test: /\.css$/,
          exclude: /(node_modules|bower_components|\.module\.css$)/,
          use: [
            mode === 'production'
              ? {
                loader: MiniCssExtractPlugin.loader,
                options: { publicPath: '../' },
              }
              : { loader: 'style-loader' },
            { loader: 'css-loader', options: { sourceMap: true } },
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: true,
                ident: 'postcss',
              },
            },
          ],
        },
        {
          test: /\.(js|jsx)$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: 'babel-loader',
          },
        },
        {
          test: /\.mjs$/,
          include: /(node_modules|bower_components)/,
          type: 'javascript/auto',
        },
        {
          test: /\.(png|jpe?g|gif|svg)$/,
          exclude: /(node_modules|bower_components|fonts)/,
          loader: 'url-loader',
          options: {
            limit: 8192,
            name: '[name].[ext]',
            outputPath: 'images/',
          },
        },
        {
          test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)$/,
          exclude: /(images)/,
          loader: 'url-loader',
          options: {
            limit: 8192,
            name: '[name].[ext]',
            outputPath: 'fonts/',
          },
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
        ...(!env.DEVTOOLS_ENABLED && mode === 'production' && { __REACT_DEVTOOLS_GLOBAL_HOOK__: '({ isDisabled: true })' }),
      }),
      new CleanWebpackPlugin(),
      ...(mode !== 'production'
        ? [
          new FriendlyErrorsWebpackPlugin({
            compilationSuccessInfo: {
              messages: [
                `Your application is running here ${colors.cyan(
                  `http://localhost:${process.env.CLIENT_PORT}`,
                )}`,
              ],
            },
            clearConsole: true,
          }),
        ]
        : []),
      ...(
        env.APP_ENV === 'production' && env.SENTRY_DSN ? [
          new SentryWebpackPlugin({
            org: env.SENTRY_ORGANIZATION_NAME,
            project: env.SENTRY_PROJECT_NAME,
            authToken: env.SENTRY_AUTH_TOKEN,
            release: version,
            include: './dist/client',
            ignore: ['node_modules'],
          }),
        ] : []
      ),
      new FixStyleOnlyEntriesPlugin(),
      new HTMLWebpackPlugin({
        inject: true,
        template: './public/index.html',
        filename: './index.html',
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
        include: {
          type: 'initial',
          entries: ['libs', 'app', 'styles'],
        },
      }),
      new PreloadWebpackPlugin({
        rel: 'prefetch',
      }),
      new StylelintPlugin({
        configFile: './stylelint.config.js',
        fix: true,
        files: '**/*.(scss|css)',
      }),
      new MiniCssExtractPlugin({
        filename: 'css/[name].css',
        chunkFilename: 'css/[name].css',
      }),
      new OptimizeCSSAssetsPlugin({
        assetNameRegExp: /\.css$/g,
        cssProcessor: CleanCSS,
        cssProcessorOptions: { level: 2, rebase: false },
        canPrint: true,
      }),
      new ESLintPlugin({
        failOnError: mode === 'production',
        failOnWarning: mode === 'production',
        context: './',
        extensions: ['js', 'jsx', 'json'],
      }),
      new CopyPlugin({
        patterns: [
          {
            from: './public/favicon-*.png',
            to: '[name].png',
          },
          ...(mode === 'production' ? [{
            from: './public/app.png',
            to: 'app.png',
          }] : []),
          {
            from: './public/manifest.json',
            to: 'manifest.json',
          },
        ],
      }),
      new Imagemin({ test: /\.(jpe?g|png|gif|svg})$/i }),
    ],
  };
};
