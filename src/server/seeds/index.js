import '@server/db';
import colors from 'colors/safe';
import { exampleAbout } from '@server/helpers/seeds/data/about';
import { exampleConfig } from '@server/helpers/seeds/data/config';
import { exampleContact } from '@server/helpers/seeds/data/contact';
import { exampleRoles } from '@server/helpers/seeds/data/roles';
import { exampleTermsOfUse } from '@server/helpers/seeds/data/termsOfUse';
import { exampleUsers } from '@server/helpers/seeds/data/users';
import exampleFAQs from '@server/helpers/seeds/data/faqs';
import exampleMessages from '@server/helpers/seeds/data/messages';
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
    await seedMessages(exampleMessages);
    await seedTermsOfUse(exampleTermsOfUse);
    await seedRoles(exampleRoles);
    await seedConfig(exampleConfig);
    await seedAbout(exampleAbout);
    await seedContact(exampleContact);
    await seedUsers(exampleUsers);
    await seedFAQs(await exampleFAQs());
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(colors.red(error));
  } finally {
    process.exit(0);
  }
};

seed();
