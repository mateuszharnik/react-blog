const register = require('@babel/register');
const browserify = require('@cypress/browserify-preprocessor');
const { existsSync } = require('fs');
const { defineConfig } = require('cypress');
const { config } = require('dotenv');
const { resolve } = require('path');
const babelConfig = require('./babel.config');
const { clean, loadData } = require('./src/e2e/data/fixtures/db');

register(babelConfig);

config();

if (process.env.USE_SEPARATE_ENVIRONMENTS === 'true') {
  const path = resolve(process.cwd(), `.env.${process.env.APP_ENV}`);

  if (existsSync(path)) {
    config({ path });
  }
}

module.exports = defineConfig({
  fixturesFolder: 'src/e2e/data/fixtures',
  screenshotsFolder: 'src/e2e/tests/screenshots',
  videosFolder: 'src/e2e/tests/videos',
  downloadsFolder: 'src/e2e/tests/downloads',
  video: false,
  e2e: {
    excludeSpecPattern: '**/examples/*',
    specPattern: 'src/e2e/tests/integration',
    supportFile: 'src/e2e/data/support.js',
    setupNodeEvents: (on, cypressConfig) => {
      cypressConfig.baseUrl = process.env.CLIENT_URL;

      on('task', {
        'db:clean': async () => {
          await clean();

          return null;
        },
        'db:load': async (fixture = 'default') => {
          const data = await loadData(fixture);

          return data;
        },
      });

      const browserifyOptions = browserify.defaultOptions;
      browserifyOptions.browserifyOptions.transform[1][1].babelrc = true;

      on('file:preprocessor', browserify(browserifyOptions));

      return cypressConfig;
    },
  },
});
