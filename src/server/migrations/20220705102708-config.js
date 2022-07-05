// eslint-disable no-console
const colors = require('colors/safe');
const { defaultConfig } = require('../helpers/seeds/data/config');

module.exports = {
  async up(db) {
    const config = {
      ...defaultConfig,
      created_at: new Date(),
      updated_at: new Date(),
      deleted_at: null,
    };

    try {
      await db.collection('configs').insertOne(config);
    } catch (error) {
      console.log(colors.red(error));
      process.exit(0);
    }
  },

  async down(db) {
    try {
      await db.collection('configs').deleteOne({});
    } catch (error) {
      console.log(colors.red(error));
      process.exit(0);
    }
  },
};
