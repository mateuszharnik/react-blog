import colors from 'colors/safe';
import mongoose from 'mongoose';
import config from '@server/config';
import { removeVersionKey, softDelete } from './plugins';

mongoose.plugin(removeVersionKey);
mongoose.plugin(softDelete);

const { DB_URL } = config;

export const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

mongoose.connect(DB_URL, options);

const db = mongoose.connection;

db.on('error', (error) => {
  // eslint-disable-next-line no-console
  console.log(colors.red(error));
  process.exit(1);
});

export default db;
