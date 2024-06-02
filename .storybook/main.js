import { resolve } from 'path';

export default {
  stories: ['../src/client/**/*.stories.js'],
  addons: [
    '@storybook/addon-webpack5-compiler-babel',
    '@storybook/addon-links',
    '@storybook/addons',
    '@storybook/addon-postcss',
    '@storybook/addon-essentials',
    '@chromatic-com/storybook',
    '@storybook/addon-interactions',
  ],
  framework: {
    name: '@storybook/react-webpack5',
    options: {},
  },
  docs: { autodocs: 'tag' },
  core: { disableTelemetry: true },
  webpackFinal: async (config) => {
    config.resolve.alias['@client'] = resolve(__dirname, '../src/client');
    config.resolve.alias['@shared'] = resolve(__dirname, '../src/shared');

    config.module.rules.push({
      test: /\.scss$/,
      exclude: /(node_modules|bower_components)/,
      include: resolve(__dirname, '../src/client/'),
      use: [
        { loader: 'style-loader' },
        { loader: 'css-loader', options: { sourceMap: true } },
        {
          loader: 'postcss-loader',
          options: {
            sourceMap: true,
          },
        },
        { loader: 'sass-loader', options: { sourceMap: true } },
      ],
    });

    config.module.rules.push({
      test: /\.css$/,
      exclude: /(node_modules|bower_components)/,
      include: resolve(__dirname, '../src/client/'),
      use: [
        { loader: 'style-loader' },
        { loader: 'css-loader', options: { sourceMap: true } },
        {
          loader: 'postcss-loader',
          options: {
            sourceMap: true,
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
