import Joi from 'joi';
import invalidUsernames from '@server/helpers/validation/invalidUsernames';
import usernameMessages from '@server/helpers/messages/username';
import passwordMessages from '@server/helpers/messages/password';
import confirmPasswordMessages from '@server/helpers/messages/confirmPassword';
import emailMessages from '@server/helpers/messages/email';
import genderMessages from '@server/helpers/messages/gender';
import isTermsOfUseAcceptedMessages from '@server/helpers/messages/isTermsOfUseAccepted';
import {
  usernameRegExp,
  emailRegExp,
} from '@server/helpers/regexps';

export const validateSignUp = (
  newUser = {}, options = { abortEarly: false }, useInvalid = true,
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
      .messages(usernameMessages),
    gender: Joi.string()
      .trim()
      .valid('kobieta', 'mężczyzna')
      .lowercase()
      .required()
      .messages(genderMessages),
    email: Joi.string()
      .trim()
      .regex(emailRegExp)
      .required()
      .messages(emailMessages),
    password: Joi.string()
      .trim()
      .min(8)
      .max(32)
      .required()
      .messages(passwordMessages),
    confirm_password: Joi.string()
      .trim()
      .valid(Joi.ref('password'))
      .required()
      .messages(confirmPasswordMessages),
    is_terms_of_use_accepted: Joi.boolean()
      .valid(true)
      .required()
      .messages(isTermsOfUseAcceptedMessages),
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
      .messages(usernameMessages),
    password: Joi.string()
      .trim()
      .required()
      .messages(passwordMessages),
  });

  const { error: validationError, value: data } = schema.validate(user, options);

  return { validationError, data };
};
