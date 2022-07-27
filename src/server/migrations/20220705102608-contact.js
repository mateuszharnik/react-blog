const colors = require('colors/safe');
const { defaultContact } = require('../helpers/seeds/data/contact');

module.exports = {
  async up(db) {
    const contact = {
      ...defaultContact,
      created_at: new Date(),
      updated_at: new Date(),
      deleted_at: null,
    };

    try {
      await db.collection('contacts').insertOne(contact);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(colors.red(error));
      process.exit(0);
    }
  },

  async down(db) {
    try {
      await db.collection('contacts').deleteOne({});
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(colors.red(error));
      process.exit(0);
    }
  },
};
