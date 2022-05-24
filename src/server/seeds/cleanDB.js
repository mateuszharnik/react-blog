// eslint-disable no-console
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

const { NODE_ENV } = config;

const cleanDB = async () => {
  try {
    await User.deleteMany({});
    if (NODE_ENV !== 'test') console.log(colors.green('Users removed from DB.'));

    await Role.deleteMany({});
    if (NODE_ENV !== 'test') console.log(colors.green('User roles removed from DB.'));

    await TermsOfUse.deleteMany({});
    if (NODE_ENV !== 'test') console.log(colors.green('Terms of use removed from DB.'));

    await About.deleteMany({});
    if (NODE_ENV !== 'test') console.log(colors.green('Information about us removed from DB.'));

    await Config.deleteMany({});
    if (NODE_ENV !== 'test') console.log(colors.green('Page settings removed from DB.'));

    await Contact.deleteMany({});
    if (NODE_ENV !== 'test') console.log(colors.green('Contact information removed from DB.'));

    await Docs.deleteMany({});
    if (NODE_ENV !== 'test') console.log(colors.green('Docs password removed from DB.'));

    await FAQ.deleteMany({});
    if (NODE_ENV !== 'test') console.log(colors.green('Frequently asked questions removed from DB.'));

    await Message.deleteMany({});
    if (NODE_ENV !== 'test') console.log(colors.green('Messages removed from DB.'));
  } catch (error) {
    console.log(colors.red(error));
    process.exit(0);
  }
};

export default cleanDB;
