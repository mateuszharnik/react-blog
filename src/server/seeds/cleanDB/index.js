import { Schema, model } from 'mongoose';
import colors from 'colors/safe';
import logger from '@server/logger';
import { removeTermsOfUse } from '@server/seeds/termsOfUse';
import { removeRoles } from '@server/seeds/roles';
import { removeUsers } from '@server/seeds/users';
import { removeAbout } from '@server/seeds/about';
import { removeConfig } from '@server/seeds/config';
import { removeContact } from '@server/seeds/contact';
import { removeDocs } from '@server/seeds/docs';
import { removeFAQs } from '@server/seeds/faqs';
import { removeMessages } from '@server/seeds/messages';

const migrationSchema = new Schema(
  {
    filename: {
      type: String,
    },
    appliedAt: {
      type: Date,
    },
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  },
);

const Migration = model('migration', migrationSchema);

const cleanDB = async (cleanMigrations = false) => {
  try {
    if (cleanMigrations) {
      await Migration.deleteMany({});
      logger.debug(colors.green('Migrations removed from DB.'));
    }

    await removeUsers();
    await removeRoles();
    await removeTermsOfUse();
    await removeAbout();
    await removeConfig();
    await removeContact();
    await removeDocs();
    await removeFAQs();
    await removeMessages();
  } catch (error) {
    logger.error(colors.red(error));
  }
};

export default cleanDB;
