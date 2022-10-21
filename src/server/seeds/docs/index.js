import colors from 'colors/safe';
import { hash } from 'bcryptjs';
import logger from '@server/logger';
import config from '@server/config';
import validateSignIn from '@server/api/v1/docs/schema';
import Docs from '@server/api/v1/docs/model';

const { DOCS_PASSWORD } = config;

const seedDocs = async () => {
  const password = { password: DOCS_PASSWORD };

  const { validationError, data } = validateSignIn(password, { allowUnknown: true });

  if (validationError) {
    logger.error(colors.red(validationError.details[0].message));
    process.exit(0);
  }

  try {
    data.password = await hash(data.password, 8);

    const newDocs = await Docs.create(data);

    logger.debug(colors.green('DB seeded with docs password.'));

    return newDocs;
  } catch (error) {
    logger.error(colors.red(error));
    process.exit(0);
  }
};

export default seedDocs;
