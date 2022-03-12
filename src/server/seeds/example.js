import '@server/db';
import colors from 'colors/safe';
import { exampleAbout } from '@server/helpers/seeds/data/about';
import { exampleConfig } from '@server/helpers/seeds/data/config';
import { exampleContact } from '@server/helpers/seeds/data/contact';
import { exampleRoles } from '@server/helpers/seeds/data/roles';
import { exampleTermsOfUse } from '@server/helpers/seeds/data/termsOfUse';
import { exampleUsers } from '@server/helpers/seeds/data/users';
import exampleMessages from '@server/helpers/seeds/data/messages';
import removeAndSeedMessages from './messages';
import removeAndSeedTermsOfUse from './termsOfUse';
import removeAndSeedAbout from './about';
import removeAndSeedConfig from './config';
import removeAndSeedContact from './contact';
import removeAndSeedRoles from './roles';
import removeAndSeedUsers from './users';
import removeAndSeedDocs from './docs';

const seed = async () => {
  try {
    await removeAndSeedDocs();
    await removeAndSeedMessages(exampleMessages);
    await removeAndSeedTermsOfUse(exampleTermsOfUse);
    await removeAndSeedRoles(exampleRoles);
    await removeAndSeedConfig(exampleConfig);
    await removeAndSeedAbout(exampleAbout);
    await removeAndSeedContact(exampleContact);
    await removeAndSeedUsers(exampleUsers);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(colors.red(error));
  } finally {
    process.exit(0);
  }
};

seed();
