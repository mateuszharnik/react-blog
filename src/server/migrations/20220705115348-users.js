const colors = require('colors/safe');
const { hash } = require('bcryptjs');
const { default: config } = require('../config');
const { default: logger } = require('../logger');
const { roleTypes } = require('../helpers/roles');

module.exports = {
  async up(db) {
    try {
      const user = {
        username: config.ADMIN_USERNAME.toLowerCase(),
        display_name: config.ADMIN_USERNAME,
        email: config.ADMIN_EMAIL,
        description: '',
        password: await hash(config.ADMIN_PASSWORD, 8),
        gender: 'male',
        facebook_url: '',
        dribbble_url: '',
        youtube_url: '',
        twitter_url: '',
        github_url: '',
        instagram_url: '',
        linkedin_url: '',
        stack_overflow_url: '',
        twitch_url: '',
        website_url: '',
        image_url: '',
        is_terms_of_use_accepted: true,
        is_email_public: false,
        is_public: false,
        is_banned: false,
        role: roleTypes.ADMIN,
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: null,
      };

      const role = await db.collection('roles').findOne({ type: user.role, deleted_at: null });

      if (!role) {
        logger.error(colors.red('Role not found.'));
      }

      user.role = role._id;

      await db.collection('users').insertOne(user);
    } catch (error) {
      logger.error(colors.red(error));
    }
  },

  async down(db) {
    try {
      await db.collection('users').deleteOne({ email: config.ADMIN_EMAIL });
    } catch (error) {
      logger.error(colors.red(error));
    }
  },
};
