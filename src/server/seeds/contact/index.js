// eslint-disable no-console
import colors from 'colors/safe';
import config from '@server/config';
import validateContact from '@server/api/v1/contact/schema';
import Contact from '@server/api/v1/contact/model';

const { NODE_ENV } = config;

const seedContact = async (contact = {}) => {
  const { validationError, data } = validateContact(contact);

  if (validationError) {
    console.log(colors.red(validationError.details[0].message));
    process.exit(0);
  }

  try {
    const newContact = await Contact.create(data);

    if (NODE_ENV !== 'test') console.log(colors.green('DB seeded with contact information.'));

    return newContact;
  } catch (error) {
    console.log(colors.red(error));
    process.exit(0);
  }
};

export default seedContact;
