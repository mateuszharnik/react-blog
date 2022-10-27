const colors = require('colors/safe');
const { default: logger } = require('../logger');

module.exports = {
  async up(db) {
    try {
      const config = {
        show_authors: false,
        show_email: false,
        show_social_media: true,
        show_comments: true,
        use_slug_url: false,
        use_docs_password: true,
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: null,
      };

      await db.collection('configs').insertOne(config);
    } catch (error) {
      logger.error(colors.red(error));
    }
  },

  async down(db) {
    try {
      await db.collection('configs').deleteOne({});
    } catch (error) {
      logger.error(colors.red(error));
    }
  },
};
