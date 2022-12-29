import colors from 'colors/safe';
import mongoose from 'mongoose';
import logger from '@server/logger';
import config from '@server/config';
import { removeVersionKey, softDelete } from './plugins';

mongoose.plugin(removeVersionKey);
mongoose.plugin(softDelete);

export const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

mongoose.connect(config.DB_URL, options);

const db = mongoose.connection;

db.on('error', (error) => {
  logger.error(colors.red(error));
  process.exit(1);
});

export default db;
