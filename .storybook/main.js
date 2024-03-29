const { resolve } = require('path');

module.exports = {
  stories: ['../src/client/**/*.stories.js'],
  addons: ['@storybook/addon-links', '@storybook/addon-actions', '@storybook/addon-essentials', '@storybook/addon-postcss'],
  webpackFinal: async (config) => {
    config.resolve.alias['@client'] = resolve(__dirname, '../src/client');
    config.resolve.alias['@shared'] = resolve(__dirname, '../src/shared');

    config.module.rules.push({
      test: /\.scss$/,
      exclude: /(node_modules|bower_components|\.module\.scss$)/,
      include: resolve(__dirname, '../src/client/'),
      use: [
        { loader: 'style-loader' },
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
    });

    config.module.rules.push({
      test: /\.css$/,
      exclude: /(node_modules|bower_components|\.module\.css$)/,
      include: resolve(__dirname, '../src/client/'),
      use: [
        { loader: 'style-loader' },
        { loader: 'css-loader', options: { sourceMap: true } },
        {
          loader: 'postcss-loader',
          options: {
            sourceMap: true,
            ident: 'postcss',
          },
        },
      ],
    });

    config.module.rules.push({
      test: /\.mjs$/,
      include: /(node_modules|bower_components)/,
      type: 'javascript/auto',
    });

    return config;
  },
};
