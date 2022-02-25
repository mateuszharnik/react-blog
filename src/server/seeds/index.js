import colors from 'colors/safe';
import '@server/db';
import { defaultAbout } from '@server/helpers/seeds/data/about';
import { defaultConfig } from '@server/helpers/seeds/data/config';
import { defaultContact } from '@server/helpers/seeds/data/contact';
import removeAndSeedMessages from './messages';
import removeAndSeedAbout from './about';
import removeAndSeedConfig from './config';
import removeAndSeedContact from './contact';

const seed = async () => {
  try {
    await removeAndSeedMessages();
    await removeAndSeedConfig(defaultConfig);
    await removeAndSeedAbout(defaultAbout);
    await removeAndSeedContact(defaultContact);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(colors.red(error));
  } finally {
    process.exit(0);
  }
};

seed();
