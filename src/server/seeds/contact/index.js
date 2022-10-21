import colors from 'colors/safe';
import logger from '@server/logger';
import validateContact from '@server/api/v1/contact/schema';
import Contact from '@server/api/v1/contact/model';

const seedContact = async (contact = {}) => {
  const { validationError, data } = validateContact(contact);

  if (validationError) {
    logger.error(colors.red(validationError.details[0].message));
    process.exit(0);
  }

  try {
    const newContact = await Contact.create(data);

    logger.debug(colors.green('DB seeded with contact information.'));

    return newContact;
  } catch (error) {
    logger.error(colors.red(error));
    process.exit(0);
  }
};

export default seedContact;
