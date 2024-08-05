import colors from 'colors/safe';
import logger from '@server/logger';
import validateId from '@server/helpers/validation/validateId';
import sanitize from '@server/helpers/purify';
import {
  ApiParamsValidationError,
  ApiBodyValidationError,
  ApiConflictError,
  ApiNotFoundError,
} from '@server/utils/errorUtils';
import { errorsConstants } from '@shared/constants';
import TermsOfUse from '../model';
import validateTermsOfUse from '../schema';

const { TERMS_OF_USE_ERRORS } = errorsConstants;

export const getTermsOfUse = async (req, res, next) => {
  try {
    const termsOfUse = await TermsOfUse.find({ deleted_at: null }).sort({ created_at: -1 });

    return res.status(200).json(termsOfUse);
  } catch (error) {
    logger.error(colors.red(error));
    next(error);
  }
};

export const getOneTermsOfUse = async (req, res, next) => {
  const { id } = req.params;

  try {
    const { validationError } = validateId(id);

    if (validationError) {
      throw ApiParamsValidationError({ validationError });
    }

    const termsOfUse = await TermsOfUse.findOne({ _id: id, deleted_at: null });

    if (!termsOfUse) {
      throw ApiNotFoundError({
        key: TERMS_OF_USE_ERRORS.TERMS_OF_USE_NOT_FOUND_ERROR,
        message: 'Terms of use not found',
      });
    }

    return res.status(200).json(termsOfUse);
  } catch (error) {
    logger.error(colors.red(error));
    next(error);
  }
};

export const updateTermsOfUse = async (req, res, next) => {
  const { id } = req.params;

  try {
    const { validationError: validationIdError } = validateId(id);

    if (validationIdError) {
      throw ApiParamsValidationError({ validationError: validationIdError });
    }

    req.body.contents = sanitize(req.body.contents);

    const { validationError, data } = validateTermsOfUse(req.body);

    if (validationError) {
      throw ApiBodyValidationError({ validationError });
    }

    const updatedTermsOfUse = await TermsOfUse.findOneAndUpdate({
      _id: id, deleted_at: null,
    }, { ...data }, { new: true });

    if (!updatedTermsOfUse) {
      throw ApiConflictError({
        key: TERMS_OF_USE_ERRORS.TERMS_OF_USE_NOT_UPDATED_ERROR,
        message: 'Terms of use not updated',
      });
    }

    return res.status(200).json(updatedTermsOfUse);
  } catch (error) {
    logger.error(colors.red(error));
    next(error);
  }
};
