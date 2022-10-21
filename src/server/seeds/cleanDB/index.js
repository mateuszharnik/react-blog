import { Schema, model } from 'mongoose';
import colors from 'colors/safe';
import logger from '@server/logger';
import TermsOfUse from '@server/api/v1/termsOfUse/model';
import Role from '@server/api/v1/roles/model';
import User from '@server/api/v1/users/model';
import About from '@server/api/v1/about/model';
import Config from '@server/api/v1/config/model';
import Contact from '@server/api/v1/contact/model';
import Docs from '@server/api/v1/docs/model';
import FAQ from '@server/api/v1/faqs/model';
import Message from '@server/api/v1/messages/model';

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

    await User.deleteMany({});
    logger.debug(colors.green('Users removed from DB.'));

    await Role.deleteMany({});
    logger.debug(colors.green('User roles removed from DB.'));

    await TermsOfUse.deleteMany({});
    logger.debug(colors.green('Terms of use removed from DB.'));

    await About.deleteMany({});
    logger.debug(colors.green('Information about us removed from DB.'));

    await Config.deleteMany({});
    logger.debug(colors.green('Page settings removed from DB.'));

    await Contact.deleteMany({});
    logger.debug(colors.green('Contact information removed from DB.'));

    await Docs.deleteMany({});
    logger.debug(colors.green('Docs password removed from DB.'));

    await FAQ.deleteMany({});
    logger.debug(colors.green('Frequently asked questions removed from DB.'));

    await Message.deleteMany({});
    logger.debug(colors.green('Messages removed from DB.'));
  } catch (error) {
    logger.error(colors.red(error));
    process.exit(0);
  }
};

export default cleanDB;
