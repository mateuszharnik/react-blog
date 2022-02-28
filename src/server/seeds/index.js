import colors from 'colors/safe';
import '@server/db';
import { defaultAbout } from '@server/helpers/seeds/data/about';
import { defaultConfig } from '@server/helpers/seeds/data/config';
import { defaultContact } from '@server/helpers/seeds/data/contact';
import { defaultRoles } from '@server/helpers/seeds/data/roles';
import { defaultTermsOfUse } from '@server/helpers/seeds/data/termsOfUse';
import removeAndSeedMessages from './messages';
import removeAndSeedTermsOfUse from './termsOfUse';
import removeAndSeedAbout from './about';
import removeAndSeedConfig from './config';
import removeAndSeedContact from './contact';
import removeAndSeedRoles from './roles';

const seed = async () => {
  try {
    await removeAndSeedMessages();
    await removeAndSeedTermsOfUse(defaultTermsOfUse);
    await removeAndSeedRoles(defaultRoles);
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
