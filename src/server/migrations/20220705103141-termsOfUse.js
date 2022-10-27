const colors = require('colors/safe');
const { default: logger } = require('../logger');
const { default: sanitize } = require('../helpers/purify');

module.exports = {
  async up(db) {
    try {
      const termsOfUse = {
        name: sanitize('Regulamin'),
        contents: '',
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: null,
      };

      await db.collection('termsofuses').insertOne(termsOfUse);
    } catch (error) {
      logger.error(colors.red(error));
    }
  },

  async down(db) {
    try {
      await db.collection('termsofuses').deleteOne({});
    } catch (error) {
      logger.error(colors.red(error));
    }
  },
};
