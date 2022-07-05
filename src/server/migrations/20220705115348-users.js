// eslint-disable no-console
const colors = require('colors/safe');
const { hash } = require('bcryptjs');
const { defaultUsers } = require('../helpers/seeds/data/users');
const { default: sanitize } = require('../helpers/purify');

module.exports = {
  async up(db) {
    const users = [];

    try {
      await Promise.all(defaultUsers.map(async (defaultUser) => {
        const user = {
          ...defaultUser,
          created_at: new Date(),
          updated_at: new Date(),
          deleted_at: null,
        };

        user.description = sanitize(user.description);
        user.display_name = user.username;
        user.username = user.username.toLowerCase();
        user.password = await hash(user.password, 8);

        const role = await db.collection('roles').findOne({ type: user?.role, deleted_at: null });

        if (!role) {
          console.log(colors.red('Role not found.'));
          process.exit(0);
        }

        user.role = role._id;

        users.push(user);
      }));

      if (users.length) {
        await db.collection('users').insertMany(users);
      }
    } catch (error) {
      console.log(colors.red(error));
      process.exit(0);
    }
  },

  async down(db) {
    try {
      const usernames = defaultUsers.map(({ username }) => username);

      await db.collection('users').deleteMany({ username: { $in: usernames } });
    } catch (error) {
      console.log(colors.red(error));
      process.exit(0);
    }
  },
};
