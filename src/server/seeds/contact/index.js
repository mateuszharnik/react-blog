import colors from 'colors/safe';
import logger from '@server/logger';
import validateContact from '@server/api/v1/contact/schema';
import Contact from '@server/api/v1/contact/model';

export const seedContact = async (contact = {}) => {
  try {
    const { validationError, data } = validateContact(contact, { allowUnknown: true });

    if (validationError) {
      logger.error(colors.red(validationError.details[0].message));
    }

    const newContact = await Contact.create(data);

    logger.debug(colors.green('DB seeded with contact information.'));

    return JSON.parse(JSON.stringify(newContact.toJSON()));
  } catch (error) {
    logger.error(colors.red(error));
  }
};

export const removeContact = async () => {
  try {
    await Contact.deleteMany({});
    logger.debug(colors.green('Contact information removed from DB.'));
  } catch (error) {
    logger.error(colors.red(error));
  }
};
