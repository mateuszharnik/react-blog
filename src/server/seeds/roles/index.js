import colors from 'colors/safe';
import logger from '@server/logger';
import validateRole from '@server/api/v1/roles/schema';
import Role from '@server/api/v1/roles/model';
import sanitize from '@server/helpers/purify';

const seedRoles = async (roles = []) => {
  const createdRoles = [];

  roles.forEach((role) => {
    const { validationError, data } = validateRole(role, { allowUnknown: true }, false);

    if (validationError) {
      logger.error(colors.red(validationError.details[0].message));
      process.exit(0);
    }

    data.name = sanitize(data.name);
    data.description = sanitize(data.description);

    createdRoles.push(data);
  });

  try {
    if (createdRoles.length) {
      const newRoles = await Role.create(createdRoles);

      logger.debug(colors.green('DB seeded with user roles.'));

      return newRoles;
    }
  } catch (error) {
    logger.error(colors.red(error));
    process.exit(0);
  }
};

export default seedRoles;
