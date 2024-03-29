import colors from 'colors/safe';
import logger from '@server/logger';
import createResponseWithError from '@server/helpers/createResponseWithError';
import mapValidationMessages from '@server/helpers/validation/mapValidationMessages';
import validateId from '@server/helpers/validation/validateId';
import sanitize from '@server/helpers/purify';
import TermsOfUse from '../model';
import validateTermsOfUse from '../schema';

export const getTermsOfUse = async (req, res, next) => {
  const responseWithError = createResponseWithError(res, next);

  try {
    const termsOfUse = await TermsOfUse.find({ deleted_at: null }).sort({ created_at: -1 });

    return res.status(200).json(termsOfUse);
  } catch (error) {
    logger.error(colors.red(error));
    responseWithError();
  }
};

export const getOneTermsOfUse = async (req, res, next) => {
  const { id } = req.params;
  const responseWithError = createResponseWithError(res, next);

  try {
    const { validationError } = validateId(id);

    if (validationError) {
      return responseWithError(409, validationError.details[0].message);
    }

    const termsOfUse = await TermsOfUse.findOne({ _id: id, deleted_at: null });

    if (!termsOfUse) {
      return responseWithError(404, 'Nie znaleziono regulaminu.');
    }

    return res.status(200).json(termsOfUse);
  } catch (error) {
    logger.error(colors.red(error));
    responseWithError();
  }
};

export const updateTermsOfUse = async (req, res, next) => {
  const { id } = req.params;
  const responseWithError = createResponseWithError(res, next);

  try {
    const { validationError: validationIdError } = validateId(id);

    if (validationIdError) {
      return responseWithError(409, validationIdError.details[0].message);
    }

    req.body.contents = sanitize(req.body.contents);

    const { validationError, data } = validateTermsOfUse(req.body);

    if (validationError) {
      return responseWithError(409, mapValidationMessages(validationError));
    }

    const updatedTermsOfUse = await TermsOfUse.findOneAndUpdate({
      _id: id, deleted_at: null,
    }, { ...data }, { new: true });

    if (!updatedTermsOfUse) {
      return responseWithError(409, 'Nie udało się zaktualizować regulaminu.');
    }

    return res.status(200).json(updatedTermsOfUse);
  } catch (error) {
    logger.error(colors.red(error));
    responseWithError();
  }
};
