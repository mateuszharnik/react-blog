const colors = require('colors/safe');
const { hash } = require('bcryptjs');
const { default: config } = require('../config');
const { default: logger } = require('../logger');

module.exports = {
  async up(db) {
    try {
      const doc = {
        password: await hash(config.DOCS_PASSWORD, 8),
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: null,
      };

      await db.collection('docs').insertOne(doc);
    } catch (error) {
      logger.error(colors.red(error));
    }
  },

  async down(db) {
    try {
      await db.collection('docs').deleteOne({});
    } catch (error) {
      logger.error(colors.red(error));
    }
  },
};
