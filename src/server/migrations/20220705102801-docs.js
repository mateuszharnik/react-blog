const colors = require('colors/safe');
const { hash } = require('bcryptjs');
const { default: config } = require('../config');
const { default: logger } = require('../logger');

const { DOCS_PASSWORD } = config;

module.exports = {
  async up(db) {
    const doc = {
      password: DOCS_PASSWORD,
      created_at: new Date(),
      updated_at: new Date(),
      deleted_at: null,
    };

    try {
      doc.password = await hash(doc.password, 8);

      await db.collection('docs').insertOne(doc);
    } catch (error) {
      logger.error(colors.red(error));
      process.exit(0);
    }
  },

  async down(db) {
    try {
      await db.collection('docs').deleteOne({});
    } catch (error) {
      logger.error(colors.red(error));
      process.exit(0);
    }
  },
};
