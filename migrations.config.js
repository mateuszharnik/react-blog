const fs = require('fs');
const register = require('@babel/register');
const { config } = require('dotenv');
const { resolve } = require('path');
const { options } = require('./src/server/db');
const babelConfig = require('./babel.config');

register(babelConfig);
config();

if (process.env.USE_SEPARATE_ENVIRONMENTS === 'true') {
  const path = resolve(process.cwd(), `.env.${process.env.APP_ENV}`);

  if (fs.existsSync(path)) {
    config({ path });
  }
}

module.exports = {
  mongodb: {
    url: process.env.DB_URL,
    options,
  },
  migrationsDir: 'src/server/migrations',
  changelogCollectionName: 'migrations',
  migrationFileExtension: '.js',
  useFileHash: false,
  moduleSystem: 'commonjs',
};
