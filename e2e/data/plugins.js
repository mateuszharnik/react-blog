const fs = require('fs');
const { config } = require('dotenv');
const { resolve } = require('path');
const babelConfig = require('../../babel.config');

// eslint-disable-next-line import/no-extraneous-dependencies
require('@babel/register')(babelConfig);

const { clean, loadData } = require('./fixtures/db');

module.exports = (on, cypressConfig) => {
  config();

  if (process.env.USE_SEPARATE_ENVIRONMENTS === 'true') {
    const path = resolve(process.cwd(), `.env.${process.env.NODE_ENV}`);

    if (fs.existsSync(path)) {
      config({ path });
    }
  }

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

  return cypressConfig;
};
