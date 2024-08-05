import Joi from 'joi';

const validateConfig = (config = {}, options = { abortEarly: false }) => {
  const schema = Joi.object().keys({
    show_authors: Joi.boolean()
      .required()
      .messages(),
    show_email: Joi.boolean()
      .required()
      .messages(),
    show_social_media: Joi.boolean()
      .required()
      .messages(),
    show_comments: Joi.boolean()
      .required()
      .messages(),
    use_slug_url: Joi.boolean()
      .required()
      .messages(),
    use_docs_password: Joi.boolean()
      .required()
      .messages(),
  });

  const { error: validationError, value: data } = schema.validate(config, options);

  return { validationError, data };
};

export default validateConfig;
