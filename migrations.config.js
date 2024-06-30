const register = require('@babel/register');
const { existsSync } = require('fs');
const { config } = require('dotenv');
const { resolve } = require('path');
const { options } = require('./src/server/db');
const babelConfig = require('./babel.config');

register(babelConfig);

config();

const path = resolve(process.cwd(), `.env.${process.env.APP_ENV}`);

if (existsSync(path)) config({ path });

console.log({ TESTOWANIE: process.env.DB_URL });

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
