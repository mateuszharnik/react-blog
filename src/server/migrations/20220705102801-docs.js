// eslint-disable no-console
const colors = require('colors/safe');
const { hash } = require('bcryptjs');
const { default: config } = require('../config');

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
      console.log(colors.red(error));
      process.exit(0);
    }
  },

  async down(db) {
    try {
      await db.collection('docs').deleteOne({});
    } catch (error) {
      console.log(colors.red(error));
      process.exit(0);
    }
  },
};
