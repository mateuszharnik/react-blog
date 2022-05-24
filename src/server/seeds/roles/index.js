// eslint-disable no-console
import colors from 'colors/safe';
import config from '@server/config';
import validateRole from '@server/api/v1/roles/schema';
import Role from '@server/api/v1/roles/model';
import sanitize from '@server/helpers/purify';

const { NODE_ENV } = config;

const seedRoles = async (roles = []) => {
  const createdRoles = [];

  roles.forEach((role) => {
    const { validationError, data } = validateRole(role, { allowUnknown: true }, false);

    if (validationError) {
      console.log(colors.red(validationError.details[0].message));
      process.exit(0);
    }

    data.name = sanitize(data.name);
    data.description = sanitize(data.description);

    createdRoles.push(data);
  });

  try {
    if (createdRoles.length) {
      const newRoles = await Role.create(createdRoles);

      if (NODE_ENV !== 'test') console.log(colors.green('DB seeded with user roles.'));

      return newRoles;
    }
  } catch (error) {
    console.log(colors.red(error));
    process.exit(0);
  }
};

export default seedRoles;
