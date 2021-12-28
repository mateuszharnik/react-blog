import colors from 'colors/safe';
import mongoose from 'mongoose';
import config from '@server/config';

const { DB_URL } = config;

mongoose.connect(DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', (error) => {
  // eslint-disable-next-line no-console
  console.log(colors.red(error));
  process.exit(1);
});

export default db;
