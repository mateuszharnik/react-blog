import colors from 'colors/safe';
import '@server/db';
import { exampleAbout } from '@server/helpers/seeds/data/about';
import { exampleConfig } from '@server/helpers/seeds/data/config';
import { exampleContact } from '@server/helpers/seeds/data/contact';
import exampleMessages from '@server/helpers/seeds/data/messages';
import removeAndSeedMessages from './messages';
import removeAndSeedAbout from './about';
import removeAndSeedConfig from './config';
import removeAndSeedContact from './contact';

const seed = async () => {
  try {
    await removeAndSeedMessages(exampleMessages);
    await removeAndSeedConfig(exampleConfig);
    await removeAndSeedAbout(exampleAbout);
    await removeAndSeedContact(exampleContact);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(colors.red(error));
  } finally {
    process.exit(0);
  }
};

seed();
