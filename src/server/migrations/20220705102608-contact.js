const colors = require('colors/safe');
const { default: logger } = require('../logger');

module.exports = {
  async up(db) {
    try {
      const contact = {
        email: '',
        facebook_url: '',
        github_url: '',
        instagram_url: '',
        twitter_url: '',
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: null,
      };

      await db.collection('contacts').insertOne(contact);
    } catch (error) {
      logger.error(colors.red(error));
    }
  },

  async down(db) {
    try {
      await db.collection('contacts').deleteOne({});
    } catch (error) {
      logger.error(colors.red(error));
    }
  },
};
