import Joi from 'joi';
import invalidUsernames from '@server/helpers/validation/invalidUsernames';

const validateRole = (role = {}, options = { abortEarly: false }, useInvalid = true) => {
  const invalid = useInvalid ? invalidUsernames : [];

  const schema = Joi.object().keys({
    name: Joi.string()
      .trim()
      .lowercase()
      .min(3)
      .max(100)
      .invalid(...invalid)
      .required()
      .messages(),
    description: Joi.string()
      .trim()
      .min(3)
      .max(2000)
      .required()
      .messages(),
    can_manage_posts: Joi.boolean()
      .required()
      .messages(),
    can_manage_categories: Joi.boolean()
      .required()
      .messages(),
    can_manage_tags: Joi.boolean()
      .required()
      .messages(),
    can_manage_comments: Joi.boolean()
      .required()
      .messages(),
    can_manage_messages: Joi.boolean()
      .required()
      .messages(),
    can_manage_contact: Joi.boolean()
      .required()
      .messages(),
    can_manage_about_us: Joi.boolean()
      .required()
      .messages(),
    can_manage_newsletter: Joi.boolean()
      .required()
      .messages(),
    can_manage_users: Joi.boolean()
      .required()
      .messages(),
    can_manage_admin_users: Joi.boolean()
      .required()
      .messages(),
    can_manage_roles: Joi.boolean()
      .required()
      .messages(),
    can_manage_terms_of_use: Joi.boolean()
      .required()
      .messages(),
    can_manage_config: Joi.boolean()
      .required()
      .messages(),
    can_manage_faqs: Joi.boolean()
      .required()
      .messages(),
  });

  const { error: validationError, value: data } = schema.validate(role, options);

  return { validationError, data };
};

export default validateRole;
