import '@server/db';
import colors from 'colors/safe';
import cleanDB from './cleanDB';

const clean = async () => {
  try {
    await cleanDB(true);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(colors.red(error));
  } finally {
    process.exit(0);
  }
};

clean();
