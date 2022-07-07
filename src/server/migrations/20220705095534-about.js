// eslint-disable no-console
const colors = require('colors/safe');
const { defaultAbout } = require('../helpers/seeds/data/about');
const { default: markdownToHTML } = require('../helpers/markdownToHTML');

module.exports = {
  async up(db) {
    console.log(process.env.NODE_ENV);
    const about = {
      ...defaultAbout,
      html_contents: markdownToHTML(defaultAbout.contents),
      created_at: new Date(),
      updated_at: new Date(),
      deleted_at: null,
    };

    try {
      await db.collection('abouts').insertOne(about);
    } catch (error) {
      console.log(colors.red(error));
      process.exit(0);
    }
  },

  async down(db) {
    try {
      await db.collection('abouts').deleteOne({});
    } catch (error) {
      console.log(colors.red(error));
      process.exit(0);
    }
  },
};
