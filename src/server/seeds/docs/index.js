import colors from 'colors/safe';
import { hash } from 'bcryptjs';
import logger from '@server/logger';
import validateSignIn from '@server/api/v1/docs/schema';
import Docs from '@server/api/v1/docs/model';

export const seedDocs = async (docs = {}) => {
  try {
    const { validationError, data } = validateSignIn(docs, { allowUnknown: true });

    if (validationError) {
      logger.error(colors.red(validationError.details[0].message));
    }

    data.password = await hash(data.password, 8);

    const newDocs = await Docs.create(data);

    logger.debug(colors.green('DB seeded with docs password.'));

    return JSON.parse(JSON.stringify(newDocs.toJSON()));
  } catch (error) {
    logger.error(colors.red(error));
  }
};

export const removeDocs = async () => {
  try {
    await Docs.deleteMany({});
    logger.debug(colors.green('Docs password removed from DB.'));
  } catch (error) {
    logger.error(colors.red(error));
  }
};
