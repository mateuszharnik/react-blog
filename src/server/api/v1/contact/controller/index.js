import colors from 'colors/safe';
import logger from '@server/logger';
import { ApiBodyValidationError, ApiConflictError, ApiNotFoundError } from '@server/utils/errorUtils';
import { errorsConstants } from '@shared/constants';
import Contact from '../model';
import validateContact from '../schema';

const { CONTACT_ERRORS } = errorsConstants;

export const getContact = async (req, res, next) => {
  try {
    const contact = await Contact.findOne({});

    if (!contact) {
      throw ApiNotFoundError({
        key: CONTACT_ERRORS.CONTACT_NOT_FOUND_ERROR,
        message: 'Contact not found',
      });
    }

    return res.status(200).json(contact);
  } catch (error) {
    logger.error(colors.red(error));
    next(error);
  }
};

export const updateContact = async (req, res, next) => {
  try {
    const { validationError, data } = validateContact(req.body);

    if (validationError) {
      throw ApiBodyValidationError({ validationError });
    }

    const updatedContact = await Contact.findOneAndUpdate({}, { ...data }, { new: true });

    if (!updatedContact) {
      throw ApiConflictError({
        key: CONTACT_ERRORS.CONTACT_NOT_UPDATED_ERROR,
        message: 'Contact not updated',
      });
    }

    return res.status(200).json(updatedContact);
  } catch (error) {
    logger.error(colors.red(error));
    next(error);
  }
};
