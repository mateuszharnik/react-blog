import '@server/db';
import colors from 'colors/safe';
import logger from '@server/logger';
import cleanDB from './cleanDB';

const clean = async () => {
  try {
    await cleanDB(true);
  } catch (error) {
    logger.error(colors.red(error));
  } finally {
    process.exit(0);
  }
};

clean();
