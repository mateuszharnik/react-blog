import colors from 'colors/safe';
import envConfig from '@server/config';
import validateConfig from '@server/api/v1/config/schema';
import Config from '@server/api/v1/config/model';

const { NODE_ENV, APP_ENV } = envConfig;

const seedConfig = async (config = {}) => {
  const { validationError, data } = validateConfig(config);

  if (validationError) {
    // eslint-disable-next-line no-console
    console.log(colors.red(validationError.details[0].message));
    process.exit(0);
  }

  try {
    const newConfig = await Config.create(data);

    // eslint-disable-next-line no-console
    if (NODE_ENV !== 'test' && APP_ENV !== 'e2e') console.log(colors.green('DB seeded with page settings.'));

    return newConfig;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(colors.red(error));
    process.exit(0);
  }
};

export default seedConfig;
