import colors from 'colors/safe';
import '@server/db';
import { exampleAbout } from '@server/helpers/seeds/data/about';
import exampleMessages from '@server/helpers/seeds/data/messages';
import removeAndSeedMessages from './messages';
import removeAndSeedAbout from './about';

const seed = async () => {
  try {
    await removeAndSeedMessages(exampleMessages);
    await removeAndSeedAbout(exampleAbout);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(colors.red(error));
  } finally {
    process.exit(0);
  }
};

seed();
