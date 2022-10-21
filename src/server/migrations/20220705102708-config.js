const colors = require('colors/safe');
const { default: logger } = require('../logger');
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
      logger.error(colors.red(error));
      process.exit(0);
    }
  },

  async down(db) {
    try {
      await db.collection('configs').deleteOne({});
    } catch (error) {
      logger.error(colors.red(error));
      process.exit(0);
    }
  },
};
