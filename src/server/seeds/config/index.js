import colors from 'colors/safe';
import configs from '@server/config';
import validateConfig from '@server/api/v1/config/schema';
import Config from '@server/api/v1/config/model';

const { NODE_ENV } = configs;

const removeAndSeedConfig = async (config = {}) => {
  const { validationError, data } = validateConfig(config);

  if (validationError) {
    // eslint-disable-next-line no-console
    console.log(colors.red(validationError.details[0].message));
    process.exit(0);
  }

  try {
    await Config.deleteMany({});

    // eslint-disable-next-line no-console
    if (NODE_ENV !== 'test') console.log(colors.green('Page settings removed from DB.'));

    await Config.create(data);

    // eslint-disable-next-line no-console
    if (NODE_ENV !== 'test') console.log(colors.green('DB seeded with page settings.'));
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(colors.red(error));
    process.exit(0);
  }
};

export default removeAndSeedConfig;
