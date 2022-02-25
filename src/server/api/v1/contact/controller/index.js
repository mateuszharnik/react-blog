import colors from 'colors/safe';
import createResponseWithError from '@server/helpers/createResponseWithError';
import Contact from '../model';
import validateContact from '../schema';

export const getContact = async (req, res, next) => {
  const responseWithError = createResponseWithError(res, next);

  try {
    const contact = await Contact.findOne({});

    if (!contact) {
      return responseWithError(404, 'Nie znaleziono informacji kontaktowych.');
    }

    return res.status(200).json(contact);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(colors.red(error));
    responseWithError();
  }
};

export const updateContact = async (req, res, next) => {
  const responseWithError = createResponseWithError(res, next);

  try {
    const { validationError, data } = validateContact(req.body);

    if (validationError) {
      return responseWithError(409, validationError.details[0].message);
    }

    const updatedContact = await Contact.findOneAndUpdate({}, { ...data }, { new: true });

    if (!updatedContact) {
      return responseWithError(409, 'Nie udało się zaktualizować informacji kontaktowych.');
    }

    return res.status(200).json(updatedContact);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(colors.red(error));
    responseWithError();
  }
};
