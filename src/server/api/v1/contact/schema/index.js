import Joi from 'joi';
import {
  emailRegExp,
  githubRegExp,
  twitterRegExp,
  facebookRegExp,
  instagramRegExp,
} from '@shared/regexps';

const validateContact = (contact = {}, options = { abortEarly: false }) => {
  const schema = Joi.object().keys({
    email: Joi.string()
      .trim()
      .regex(emailRegExp)
      .allow('')
      .required()
      .messages(),
    facebook_url: Joi.string()
      .trim()
      .regex(facebookRegExp)
      .allow('')
      .required()
      .messages(),
    twitter_url: Joi.string()
      .trim()
      .regex(twitterRegExp)
      .allow('')
      .required()
      .messages(),
    instagram_url: Joi.string()
      .trim()
      .regex(instagramRegExp)
      .allow('')
      .required()
      .messages(),
    github_url: Joi.string()
      .trim()
      .regex(githubRegExp)
      .allow('')
      .required()
      .messages(),
  });

  const { error: validationError, value: data } = schema.validate(contact, options);

  return { validationError, data };
};

export default validateContact;
