import colors from 'colors/safe';
import logger from '@server/logger';
import validateRole from '@server/api/v1/roles/schema';
import Role from '@server/api/v1/roles/model';
import sanitize from '@server/helpers/purify';

export const seedRoles = async (role = {}) => {
  try {
    const { validationError, data } = validateRole(role, { allowUnknown: true }, false);

    if (validationError) {
      logger.error(colors.red(validationError.details[0].message));
    }

    data.name = sanitize(data.name);
    data.description = sanitize(data.description);

    const newRole = await Role.create(data);

    logger.debug(colors.green('DB seeded with user role.'));

    return JSON.parse(JSON.stringify(newRole.toJSON()));
  } catch (error) {
    logger.error(colors.red(error));
  }
};

export const removeRoles = async () => {
  try {
    await Role.deleteMany({});
    logger.debug(colors.green('User roles removed from DB.'));
  } catch (error) {
    logger.error(colors.red(error));
  }
};
