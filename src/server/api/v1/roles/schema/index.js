import Joi from 'joi';
import nameMessages from '@server/helpers/messages/roles/name';
import descriptionMessages from '@server/helpers/messages/roles/description';
import managePostsMessages from '@server/helpers/messages/roles/managePosts';
import manageCategoriesMessages from '@server/helpers/messages/roles/manageCategories';
import manageTagsMessages from '@server/helpers/messages/roles/manageTags';
import manageCommentsMessages from '@server/helpers/messages/roles/manageComments';
import manageMessagesMessages from '@server/helpers/messages/roles/manageMessages';
import manageContactMessages from '@server/helpers/messages/roles/manageContact';
import manageAboutUsMessages from '@server/helpers/messages/roles/manageAboutUs';
import manageNewsletterMessages from '@server/helpers/messages/roles/manageNewsletter';
import manageUsersMessages from '@server/helpers/messages/roles/manageUsers';
import manageAdminUsersMessages from '@server/helpers/messages/roles/manageAdminUsers';
import manageRolesMessages from '@server/helpers/messages/roles/manageRoles';
import manageTermsOfUseMessages from '@server/helpers/messages/roles/manageTermsOfUse';
import manageConfigMessages from '@server/helpers/messages/roles/manageConfig';
import manageFAQsMessages from '@server/helpers/messages/roles/manageFAQs';

const validateRole = (role = {}, options = {}, useInvalid = true) => {
  const invalid = useInvalid ? ['admin', 'admins', 'administrator', 'użytkownik', 'user', 'users', 'uzytkownik'] : [];

  const schema = Joi.object().keys({
    name: Joi.string()
      .trim()
      .lowercase()
      .min(3)
      .max(100)
      .invalid(...invalid)
      .required()
      .messages(nameMessages),
    description: Joi.string()
      .trim()
      .min(3)
      .max(2000)
      .required()
      .messages(descriptionMessages),
    can_manage_posts: Joi.boolean()
      .required()
      .messages(managePostsMessages),
    can_manage_categories: Joi.boolean()
      .required()
      .messages(manageCategoriesMessages),
    can_manage_tags: Joi.boolean()
      .required()
      .messages(manageTagsMessages),
    can_manage_comments: Joi.boolean()
      .required()
      .messages(manageCommentsMessages),
    can_manage_messages: Joi.boolean()
      .required()
      .messages(manageMessagesMessages),
    can_manage_contact: Joi.boolean()
      .required()
      .messages(manageContactMessages),
    can_manage_about_us: Joi.boolean()
      .required()
      .messages(manageAboutUsMessages),
    can_manage_newsletter: Joi.boolean()
      .required()
      .messages(manageNewsletterMessages),
    can_manage_users: Joi.boolean()
      .required()
      .messages(manageUsersMessages),
    can_manage_admin_users: Joi.boolean()
      .required()
      .messages(manageAdminUsersMessages),
    can_manage_roles: Joi.boolean()
      .required()
      .messages(manageRolesMessages),
    can_manage_terms_of_use: Joi.boolean()
      .required()
      .messages(manageTermsOfUseMessages),
    can_manage_config: Joi.boolean()
      .required()
      .messages(manageConfigMessages),
    can_manage_faqs: Joi.boolean()
      .required()
      .messages(manageFAQsMessages),
  });

  const { error: validationError, value: data } = schema.validate(role, options);

  return { validationError, data };
};

export default validateRole;
