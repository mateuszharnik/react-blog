// eslint-disable no-console
const colors = require('colors/safe');
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
      console.log(colors.red(error));
      process.exit(0);
    }
  },

  async down(db) {
    try {
      await db.collection('termsofuses').deleteOne({});
    } catch (error) {
      console.log(colors.red(error));
      process.exit(0);
    }
  },
};
