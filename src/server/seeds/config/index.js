// eslint-disable no-console
import colors from 'colors/safe';
import envConfig from '@server/config';
import validateConfig from '@server/api/v1/config/schema';
import Config from '@server/api/v1/config/model';

const { NODE_ENV } = envConfig;

const seedConfig = async (config = {}) => {
  const { validationError, data } = validateConfig(config);

  if (validationError) {
    console.log(colors.red(validationError.details[0].message));
    process.exit(0);
  }

  try {
    const newConfig = await Config.create(data);

    if (NODE_ENV !== 'test') console.log(colors.green('DB seeded with page settings.'));

    return newConfig;
  } catch (error) {
    console.log(colors.red(error));
    process.exit(0);
  }
};

export default seedConfig;
