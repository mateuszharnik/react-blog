import colors from 'colors/safe';
import logger from '@server/logger';
import { ApiBodyValidationError, ApiConflictError, ApiNotFoundError } from '@server/utils/errorUtils';
import { errorsConstants } from '@shared/constants';
import Config from '../model';
import validateConfig from '../schema';

const { CONFIG_ERRORS } = errorsConstants;

export const getConfig = async (req, res, next) => {
  try {
    const config = await Config.findOne({});

    if (!config) {
      throw ApiNotFoundError({
        key: CONFIG_ERRORS.CONFIG_NOT_FOUND_ERROR,
        message: 'Config not found',
      });
    }

    return res.status(200).json(config);
  } catch (error) {
    logger.error(colors.red(error));
    next(error);
  }
};

export const updateConfig = async (req, res, next) => {
  try {
    const { validationError, data } = validateConfig(req.body);

    if (validationError) {
      throw ApiBodyValidationError({ validationError });
    }

    const updatedConfig = await Config.findOneAndUpdate({}, { ...data }, { new: true });

    if (!updatedConfig) {
      throw ApiConflictError({
        key: CONFIG_ERRORS.CONFIG_NOT_UPDATED_ERROR,
        message: 'Config not updated',
      });
    }

    return res.status(200).json(updatedConfig);
  } catch (error) {
    logger.error(colors.red(error));
    next(error);
  }
};
