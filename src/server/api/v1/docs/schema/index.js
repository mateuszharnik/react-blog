import Joi from 'joi';

const validateSignIn = (password = {}, options = { abortEarly: false }) => {
  const schema = Joi.object().keys({
    password: Joi.string()
      .trim()
      .required()
      .messages(),
  });

  const { error: validationError, value: data } = schema.validate(password, options);

  return { validationError, data };
};

export default validateSignIn;
