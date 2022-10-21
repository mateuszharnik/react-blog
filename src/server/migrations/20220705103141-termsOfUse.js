const colors = require('colors/safe');
const { default: logger } = require('../logger');
const { defaultTermsOfUse } = require('../helpers/seeds/data/termsOfUse');
const { default: sanitize } = require('../helpers/purify');

module.exports = {
  async up(db) {
    const termsOfUse = {
      ...defaultTermsOfUse,
      created_at: new Date(),
      updated_at: new Date(),
      deleted_at: null,
    };

    termsOfUse.contents = sanitize(termsOfUse.contents);

    try {
      await db.collection('termsofuses').insertOne(termsOfUse);
    } catch (error) {
      logger.error(colors.red(error));
      process.exit(0);
    }
  },

  async down(db) {
    try {
      await db.collection('termsofuses').deleteOne({});
    } catch (error) {
      logger.error(colors.red(error));
      process.exit(0);
    }
  },
};
