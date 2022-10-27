import Joi from 'joi';
import passwordMessages from '@server/helpers/messages/password';

const validateSignIn = (password = {}, options = { abortEarly: false }) => {
  const schema = Joi.object().keys({
    password: Joi.string()
      .trim()
      .min(8)
      .max(32)
      .required()
      .messages(passwordMessages),
  });

  const { error: validationError, value: data } = schema.validate(password, options);

  return { validationError, data };
};

export default validateSignIn;
