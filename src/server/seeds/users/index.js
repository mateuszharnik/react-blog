import colors from 'colors/safe';
import { hash } from 'bcryptjs';
import config from '@server/config';
import validateUser from '@server/api/v1/users/schema';
import Role from '@server/api/v1/roles/model';
import User from '@server/api/v1/users/model';
import purify from '@server/helpers/purify';

const { NODE_ENV } = config;

const removeAndSeedUsers = async (users = []) => {
  const createdUsers = [];

  await Promise.all(users.map(async (user) => {
    const { validationError, data } = validateUser(user, { allowUnknown: true }, false);

    if (validationError) {
      // eslint-disable-next-line no-console
      console.log(colors.red(validationError.details[0].message));
      process.exit(0);
    }

    data.description = purify(data.description);
    data.display_name = data.username;
    data.username = data.username.toLowerCase();

    const role = await Role.findOne({ type: data?.role, deleted_at: null });

    if (!role) {
      // eslint-disable-next-line no-console
      console.log(colors.red('Role not found.'));
      process.exit(0);
    }

    data.role = role.id;

    data.password = await hash(data.password, 8);

    createdUsers.push(data);
  }));

  try {
    await User.deleteMany({});

    // eslint-disable-next-line no-console
    if (NODE_ENV !== 'test') console.log(colors.green('Users removed from DB.'));

    if (createdUsers.length) {
      await User.create(createdUsers);

      // eslint-disable-next-line no-console
      if (NODE_ENV !== 'test') console.log(colors.green('DB seeded with users.'));
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(colors.red(error));
    process.exit(0);
  }
};

export default removeAndSeedUsers;
