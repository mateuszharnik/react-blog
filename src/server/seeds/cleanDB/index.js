import { Schema, model } from 'mongoose';
import colors from 'colors/safe';
import config from '@server/config';
import TermsOfUse from '@server/api/v1/termsOfUse/model';
import Role from '@server/api/v1/roles/model';
import User from '@server/api/v1/users/model';
import About from '@server/api/v1/about/model';
import Config from '@server/api/v1/config/model';
import Contact from '@server/api/v1/contact/model';
import Docs from '@server/api/v1/docs/model';
import FAQ from '@server/api/v1/faqs/model';
import Message from '@server/api/v1/messages/model';

const { NODE_ENV, APP_ENV } = config;

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

      // eslint-disable-next-line no-console
      if (NODE_ENV !== 'test' && APP_ENV !== 'e2e') console.log(colors.green('Migrations removed from DB.'));
    }

    await User.deleteMany({});

    // eslint-disable-next-line no-console
    if (NODE_ENV !== 'test' && APP_ENV !== 'e2e') console.log(colors.green('Users removed from DB.'));

    await Role.deleteMany({});

    // eslint-disable-next-line no-console
    if (NODE_ENV !== 'test' && APP_ENV !== 'e2e') console.log(colors.green('User roles removed from DB.'));

    await TermsOfUse.deleteMany({});

    // eslint-disable-next-line no-console
    if (NODE_ENV !== 'test' && APP_ENV !== 'e2e') console.log(colors.green('Terms of use removed from DB.'));

    await About.deleteMany({});

    // eslint-disable-next-line no-console
    if (NODE_ENV !== 'test' && APP_ENV !== 'e2e') console.log(colors.green('Information about us removed from DB.'));

    await Config.deleteMany({});

    // eslint-disable-next-line no-console
    if (NODE_ENV !== 'test' && APP_ENV !== 'e2e') console.log(colors.green('Page settings removed from DB.'));

    await Contact.deleteMany({});

    // eslint-disable-next-line no-console
    if (NODE_ENV !== 'test' && APP_ENV !== 'e2e') console.log(colors.green('Contact information removed from DB.'));

    await Docs.deleteMany({});

    // eslint-disable-next-line no-console
    if (NODE_ENV !== 'test' && APP_ENV !== 'e2e') console.log(colors.green('Docs password removed from DB.'));

    await FAQ.deleteMany({});

    // eslint-disable-next-line no-console
    if (NODE_ENV !== 'test' && APP_ENV !== 'e2e') console.log(colors.green('Frequently asked questions removed from DB.'));

    await Message.deleteMany({});

    // eslint-disable-next-line no-console
    if (NODE_ENV !== 'test' && APP_ENV !== 'e2e') console.log(colors.green('Messages removed from DB.'));
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(colors.red(error));
    process.exit(0);
  }
};

export default cleanDB;
