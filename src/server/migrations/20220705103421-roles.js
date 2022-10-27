const colors = require('colors/safe');
const { default: logger } = require('../logger');
const { default: sanitize } = require('../helpers/purify');
const { roleTypes } = require('../helpers/roles');

const adminName = sanitize('administrator');
const adminDescription = sanitize('Administrator bloga. Tej roli nie można usunąć.');

const userName = sanitize('użytkownik');
const userDescription = sanitize('Konto zarejestrowanego użytkownika. Tej roli nie można usunąć.');

module.exports = {
  async up(db) {
    try {
      const adminRole = {
        name: adminName,
        description: adminDescription,
        type: roleTypes.ADMIN,
        can_manage_posts: true,
        can_manage_categories: true,
        can_manage_tags: true,
        can_manage_comments: true,
        can_manage_messages: true,
        can_manage_contact: true,
        can_manage_about_us: true,
        can_manage_newsletter: true,
        can_manage_users: true,
        can_manage_admin_users: true,
        can_manage_roles: true,
        can_manage_terms_of_use: true,
        can_manage_config: true,
        can_manage_faqs: true,
        can_be_banned: false,
        can_be_modified: false,
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: null,
      };

      const userRole = {
        name: userName,
        description: userDescription,
        type: roleTypes.USER,
        can_manage_posts: false,
        can_manage_categories: false,
        can_manage_tags: false,
        can_manage_comments: false,
        can_manage_messages: false,
        can_manage_contact: false,
        can_manage_about_us: false,
        can_manage_newsletter: false,
        can_manage_users: false,
        can_manage_admin_users: false,
        can_manage_roles: false,
        can_manage_terms_of_use: false,
        can_manage_config: false,
        can_manage_faqs: false,
        can_be_banned: true,
        can_be_modified: false,
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: null,
      };

      await db.collection('roles').insertMany([adminRole, userRole]);
    } catch (error) {
      logger.error(colors.red(error));
    }
  },

  async down(db) {
    try {
      const names = [adminName, userName].map((name) => name);

      await db.collection('roles').deleteMany({ name: { $in: names } });
    } catch (error) {
      logger.error(colors.red(error));
    }
  },
};
