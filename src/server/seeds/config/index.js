import colors from 'colors/safe';
import logger from '@server/logger';
import validateConfig from '@server/api/v1/config/schema';
import Config from '@server/api/v1/config/model';

const seedConfig = async (config = {}) => {
  const { validationError, data } = validateConfig(config);

  if (validationError) {
    logger.error(colors.red(validationError.details[0].message));
    process.exit(0);
  }

  try {
    const newConfig = await Config.create(data);

    logger.debug(colors.green('DB seeded with page settings.'));

    return newConfig;
  } catch (error) {
    logger.error(colors.red(error));
    process.exit(0);
  }
};

export default seedConfig;
