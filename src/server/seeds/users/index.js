import colors from 'colors/safe';
import { hash } from 'bcryptjs';
import logger from '@server/logger';
import validateUser from '@server/api/v1/users/schema';
import User from '@server/api/v1/users/model';
import sanitize from '@server/helpers/purify';

export const seedUsers = async (user = {}) => {
  try {
    const { validationError, data } = validateUser(user, { allowUnknown: true }, false);

    if (validationError) {
      logger.error(colors.red(validationError.details[0].message));
    }

    data.description = sanitize(data.description);
    data.display_name = data.username;
    data.username = data.username.toLowerCase();
    data.password = await hash(data.password, 8);

    const newUser = await User.create(data);

    logger.debug(colors.green('DB seeded with user.'));

    return JSON.parse(JSON.stringify(newUser.toJSON()));
  } catch (error) {
    logger.error(colors.red(error));
  }
};

export const removeUsers = async () => {
  try {
    await User.deleteMany({});
    logger.debug(colors.green('Users removed from DB.'));
  } catch (error) {
    logger.error(colors.red(error));
  }
};
