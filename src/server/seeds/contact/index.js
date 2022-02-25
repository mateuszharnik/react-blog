import colors from 'colors/safe';
import validateContact from '@server/api/v1/contact/schema';
import Contact from '@server/api/v1/contact/model';

const removeAndSeedContact = async (contact = {}) => {
  const { validationError, data } = validateContact(contact);

  if (validationError) {
    // eslint-disable-next-line no-console
    console.log(colors.red(validationError.details[0].message));
    process.exit(0);
  }

  try {
    await Contact.deleteMany({});

    // eslint-disable-next-line no-console
    console.log(colors.green('Contact information removed from DB.'));

    await Contact.create(data);

    // eslint-disable-next-line no-console
    console.log(colors.green('DB seeded with contact information.'));
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(colors.red(error));
    process.exit(0);
  }
};

export default removeAndSeedContact;
