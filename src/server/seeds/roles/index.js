import colors from 'colors/safe';
import validateRole from '@server/api/v1/roles/schema';
import Role from '@server/api/v1/roles/model';
import purify from '@server/helpers/purify';

const removeAndSeedRoles = async (roles = []) => {
  const createdRoles = [];

  roles.forEach((role) => {
    const { validationError, data } = validateRole(role, { allowUnknown: true }, false);

    if (validationError) {
      // eslint-disable-next-line no-console
      console.log(colors.red(validationError.details[0].message));
      process.exit(0);
    }

    data.name = purify(data.name);
    data.description = purify(data.description);

    createdRoles.push(data);
  });

  try {
    await Role.deleteMany({});

    // eslint-disable-next-line no-console
    console.log(colors.green('User roles removed from DB.'));

    if (createdRoles.length) {
      await Role.create(createdRoles);

      // eslint-disable-next-line no-console
      console.log(colors.green('DB seeded with user roles.'));
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(colors.red(error));
    process.exit(0);
  }
};

export default removeAndSeedRoles;
