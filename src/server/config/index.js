import Joi from 'joi';
import colors from 'colors/safe';
import { config } from 'dotenv';

config();

const schema = Joi.object({
  NODE_ENV: Joi.string().trim().default('development').valid('development', 'production'),
  PORT: Joi.string().trim().default('3000'),
  CLIENT_URL: Joi.string().trim().default('http://localhost:8080'),
  DB_URL: Joi.string().trim().default('mongodb://localhost/db'),
}).unknown(true);

const { error, value } = schema.validate(process.env);

if (error) {
  // eslint-disable-next-line no-console
  console.error(colors.red(`Missing property in config file: ${error.message}`));
  process.exit(1);
}

export default value;
