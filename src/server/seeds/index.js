import '@server/db';
import colors from 'colors/safe';
import { defaultAbout } from '@server/helpers/seeds/data/about';
import { defaultConfig } from '@server/helpers/seeds/data/config';
import { defaultContact } from '@server/helpers/seeds/data/contact';
import { defaultRoles } from '@server/helpers/seeds/data/roles';
import { defaultTermsOfUse } from '@server/helpers/seeds/data/termsOfUse';
import { defaultUsers } from '@server/helpers/seeds/data/users';
import cleanDB from './cleanDB';
import seedMessages from './messages';
import seedFAQs from './faqs';
import seedTermsOfUse from './termsOfUse';
import seedAbout from './about';
import seedConfig from './config';
import seedContact from './contact';
import seedRoles from './roles';
import seedUsers from './users';
import seedDocs from './docs';

const seed = async () => {
  try {
    await cleanDB();
    await seedDocs();
    await seedMessages();
    await seedFAQs();
    await seedTermsOfUse(defaultTermsOfUse);
    await seedRoles(defaultRoles);
    await seedConfig(defaultConfig);
    await seedAbout(defaultAbout);
    await seedContact(defaultContact);
    await seedUsers(defaultUsers);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(colors.red(error));
  } finally {
    process.exit(0);
  }
};

seed();
