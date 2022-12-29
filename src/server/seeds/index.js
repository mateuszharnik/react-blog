import '@server/db';
import colors from 'colors/safe';
import logger from '@server/logger';
import { mockedDocs } from '@server/mocks/docs';
import { mockedAbout } from '@server/mocks/about';
import { mockedConfig } from '@server/mocks/config';
import { mockedContact } from '@server/mocks/contact';
import { mockedTermsOfUse } from '@server/mocks/termsOfUse';
import { mockedAdmin, mockedModerator, mockedUser } from '@server/mocks/users';
import { mockedFAQ1, mockedFAQ2, mockedFAQ3 } from '@server/mocks/faqs';
import { mockedAdminRole, mockedModeratorRole, mockedUserRole } from '@server/mocks/roles';
import {
  mockedMessage1, mockedMessage2, mockedMessage3, mockedMessage4, mockedMessage5,
} from '@server/mocks/messages';
import cleanDB from './cleanDB';
import { seedMessages } from './messages';
import { seedFAQs } from './faqs';
import { seedTermsOfUse } from './termsOfUse';
import { seedAbout } from './about';
import { seedConfig } from './config';
import { seedContact } from './contact';
import { seedRoles } from './roles';
import { seedUsers } from './users';
import { seedDocs } from './docs';

const seed = async () => {
  try {
    await cleanDB();

    const adminRole = await seedRoles(mockedAdminRole);
    const moderatorRole = await seedRoles(mockedModeratorRole);
    const userRole = await seedRoles(mockedUserRole);

    const admin = await seedUsers({ ...mockedAdmin, role: adminRole.id });
    const moderator = await seedUsers({ ...mockedModerator, role: moderatorRole.id });

    await seedUsers({ ...mockedUser, role: userRole.id });

    await seedFAQs({ ...mockedFAQ1, user: admin.id });
    await seedFAQs({ ...mockedFAQ2, user: admin.id });
    await seedFAQs({ ...mockedFAQ3, user: moderator.id });

    await seedMessages(mockedMessage1);
    await seedMessages(mockedMessage2);
    await seedMessages(mockedMessage3);
    await seedMessages(mockedMessage4);
    await seedMessages(mockedMessage5);

    await seedDocs(mockedDocs);
    await seedAbout(mockedAbout);
    await seedConfig(mockedConfig);
    await seedContact(mockedContact);
    await seedTermsOfUse(mockedTermsOfUse);
  } catch (error) {
    logger.error(colors.red(error));
  } finally {
    process.exit(0);
  }
};

seed();
