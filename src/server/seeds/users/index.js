import colors from 'colors/safe';
import { hash } from 'bcryptjs';
import logger from '@server/logger';
import validateUser from '@server/api/v1/users/schema';
import Role from '@server/api/v1/roles/model';
import User from '@server/api/v1/users/model';
import sanitize from '@server/helpers/purify';

const seedUsers = async (users = []) => {
  const createdUsers = [];

  try {
    await Promise.all(users.map(async (user) => {
      const { validationError, data } = validateUser(user, { allowUnknown: true }, false);

      if (validationError) {
        logger.error(colors.red(validationError.details[0].message));
        process.exit(0);
      }

      data.description = sanitize(data.description);
      data.display_name = data.username;
      data.username = data.username.toLowerCase();

      const role = await Role.findOne({ type: data?.role, deleted_at: null });

      if (!role) {
        logger.error(colors.red('Role not found.'));
        process.exit(0);
      }

      data.role = role.id;

      data.password = await hash(data.password, 8);

      createdUsers.push(data);
    }));

    if (createdUsers.length) {
      const newUsers = await User.create(createdUsers);

      logger.debug(colors.green('DB seeded with users.'));

      return newUsers;
    }
  } catch (error) {
    logger.error(colors.red(error));
    process.exit(0);
  }
};

export default seedUsers;
