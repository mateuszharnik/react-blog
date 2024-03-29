import colors from 'colors/safe';
import logger from '@server/logger';
import createResponseWithError from '@server/helpers/createResponseWithError';
import mapValidationMessages from '@server/helpers/validation/mapValidationMessages';
import Config from '../model';
import validateConfig from '../schema';

export const getConfig = async (req, res, next) => {
  const responseWithError = createResponseWithError(res, next);

  try {
    const config = await Config.findOne({});

    if (!config) {
      return responseWithError(404, 'Nie znaleziono ustawień strony.');
    }

    return res.status(200).json(config);
  } catch (error) {
    logger.error(colors.red(error));
    responseWithError();
  }
};

export const updateConfig = async (req, res, next) => {
  const responseWithError = createResponseWithError(res, next);

  try {
    const { validationError, data } = validateConfig(req.body);

    if (validationError) {
      return responseWithError(409, mapValidationMessages(validationError));
    }

    const updatedConfig = await Config.findOneAndUpdate({}, { ...data }, { new: true });

    if (!updatedConfig) {
      return responseWithError(409, 'Nie udało się zaktualizować ustawień strony.');
    }

    return res.status(200).json(updatedConfig);
  } catch (error) {
    logger.error(colors.red(error));
    responseWithError();
  }
};
