import colors from 'colors/safe';
import logger from '@server/logger';
import validateConfig from '@server/api/v1/config/schema';
import Config from '@server/api/v1/config/model';

export const seedConfig = async (config = {}) => {
  try {
    const { validationError, data } = validateConfig(config, { allowUnknown: true });

    if (validationError) {
      logger.error(colors.red(validationError.details[0].message));
    }

    const newConfig = await Config.create(data);

    logger.debug(colors.green('DB seeded with page settings.'));

    return JSON.parse(JSON.stringify(newConfig.toJSON()));
  } catch (error) {
    logger.error(colors.red(error));
  }
};

export const removeConfig = async () => {
  try {
    await Config.deleteMany({});
    logger.debug(colors.green('Page settings removed from DB.'));
  } catch (error) {
    logger.error(colors.red(error));
  }
};
