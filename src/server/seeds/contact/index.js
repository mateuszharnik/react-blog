import colors from 'colors/safe';
import config from '@server/config';
import validateContact from '@server/api/v1/contact/schema';
import Contact from '@server/api/v1/contact/model';

const { NODE_ENV, APP_ENV } = config;

const seedContact = async (contact = {}) => {
  const { validationError, data } = validateContact(contact);

  if (validationError) {
    // eslint-disable-next-line no-console
    console.log(colors.red(validationError.details[0].message));
    process.exit(0);
  }

  try {
    const newContact = await Contact.create(data);

    // eslint-disable-next-line no-console
    if (NODE_ENV !== 'test' && APP_ENV !== 'e2e') console.log(colors.green('DB seeded with contact information.'));

    return newContact;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(colors.red(error));
    process.exit(0);
  }
};

export default seedContact;
