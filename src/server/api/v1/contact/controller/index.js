import colors from 'colors/safe';
import logger from '@server/logger';
import createResponseWithError from '@server/helpers/createResponseWithError';
import mapValidationMessages from '@server/helpers/validation/mapValidationMessages';
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
    logger.error(colors.red(error));
    responseWithError();
  }
};

export const updateContact = async (req, res, next) => {
  const responseWithError = createResponseWithError(res, next);

  try {
    const { validationError, data } = validateContact(req.body);

    if (validationError) {
      return responseWithError(409, mapValidationMessages(validationError));
    }

    const updatedContact = await Contact.findOneAndUpdate({}, { ...data }, { new: true });

    if (!updatedContact) {
      return responseWithError(409, 'Nie udało się zaktualizować informacji kontaktowych.');
    }

    return res.status(200).json(updatedContact);
  } catch (error) {
    logger.error(colors.red(error));
    responseWithError();
  }
};
