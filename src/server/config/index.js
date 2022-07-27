import Joi from 'joi';
import colors from 'colors/safe';
import fs from 'fs';
import { resolve } from 'path';
import { config } from 'dotenv';
import { emailRegExp } from '@server/helpers/regexps';

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
    .default('development')
    .valid('development', 'production', 'test'),
  APP_ENV: Joi.string()
    .trim()
    .default('development')
    .valid('development', 'production', 'test', 'e2e', 'staging', 'testing'),
  PORT: Joi.string()
    .trim()
    .default('3000'),
  ACCESS_TOKEN_SECRET: Joi.string()
    .trim()
    .required(),
  REFRESH_TOKEN_SECRET: Joi.string()
    .trim()
    .required(),
  DOCS_TOKEN_SECRET: Joi.string()
    .trim()
    .required(),
  DOCS_PASSWORD: Joi.string()
    .trim()
    .min(8)
    .max(32)
    .required(),
  ADMIN_USERNAME: Joi.string()
    .trim()
    .alphanum()
    .min(3)
    .max(32)
    .required(),
  ADMIN_PASSWORD: Joi.string()
    .trim()
    .min(8)
    .max(32)
    .required(),
  ADMIN_EMAIL: Joi.string()
    .trim()
    .regex(emailRegExp)
    .required(),
  CLIENT_URL: Joi.string()
    .trim()
    .default('http://localhost:8080'),
  DB_URL: Joi.string()
    .trim()
    .default('mongodb://localhost/db'),
}).unknown(true);

const { error, value } = schema.validate(process.env);

if (error) {
  // eslint-disable-next-line no-console
  console.error(colors.red(`Missing property in config file: ${error.message}`));
  process.exit(1);
}

export default value;
