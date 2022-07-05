// eslint-disable no-console
const colors = require('colors/safe');
const { defaultRoles } = require('../helpers/seeds/data/roles');
const { default: sanitize } = require('../helpers/purify');

module.exports = {
  async up(db) {
    const roles = [];

    defaultRoles.forEach((defaultRole) => {
      const role = {
        ...defaultRole,
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: null,
      };

      role.name = sanitize(role.name);
      role.description = sanitize(role.description);

      roles.push(role);
    });

    try {
      if (roles.length) {
        await db.collection('roles').insertMany(roles);
      }
    } catch (error) {
      console.log(colors.red(error));
      process.exit(0);
    }
  },

  async down(db) {
    try {
      const names = defaultRoles.map(({ name }) => name);

      await db.collection('roles').deleteMany({ name: { $in: names } });
    } catch (error) {
      console.log(colors.red(error));
      process.exit(0);
    }
  },
};
