import Joi from 'joi';
import invalidUsernames from '@server/helpers/validation/invalidUsernames';
import {
  usernameRegExp,
  emailRegExp,
} from '@shared/regexps';

export const validateSignUp = (
  newUser = {},
  options = { abortEarly: false },
  useInvalid = true,
) => {
  const invalid = useInvalid ? invalidUsernames : [];

  const schema = Joi.object().keys({
    username: Joi.string()
      .trim()
      .alphanum()
      .min(3)
      .max(32)
      .invalid(...invalid)
      .required()
      .messages(),
    gender: Joi.string()
      .trim()
      .valid('female', 'male')
      .lowercase()
      .required()
      .messages(),
    email: Joi.string()
      .trim()
      .regex(emailRegExp)
      .required()
      .messages(),
    password: Joi.string()
      .trim()
      .min(8)
      .max(32)
      .required()
      .messages(),
    confirm_password: Joi.string()
      .trim()
      .valid(Joi.ref('password'))
      .required()
      .messages(),
    is_terms_of_use_accepted: Joi.boolean()
      .valid(true)
      .required()
      .messages(),
  });

  const { error: validationError, value: data } = schema.validate(newUser, options);

  return { validationError, data };
};

export const validateSignIn = (user = {}, options = { abortEarly: false }) => {
  const schema = Joi.object().keys({
    username: Joi.string()
      .trim()
      .regex(usernameRegExp)
      .required()
      .messages(),
    password: Joi.string()
      .trim()
      .required()
      .messages(),
  });

  const { error: validationError, value: data } = schema.validate(user, options);

  return { validationError, data };
};
