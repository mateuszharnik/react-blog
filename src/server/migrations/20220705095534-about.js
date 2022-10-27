const colors = require('colors/safe');
const { default: logger } = require('../logger');
const { default: markdownToHTML } = require('../helpers/markdownToHTML');

module.exports = {
  async up(db) {
    try {
      const about = {
        contents: '',
        html_contents: markdownToHTML(''),
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: null,
      };

      await db.collection('abouts').insertOne(about);
    } catch (error) {
      logger.error(colors.red(error));
    }
  },

  async down(db) {
    try {
      await db.collection('abouts').deleteOne({});
    } catch (error) {
      logger.error(colors.red(error));
    }
  },
};
