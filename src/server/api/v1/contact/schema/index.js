import Joi from 'joi';
import emailMessages from '@server/helpers/messages/email';
import facebookMessages from '@server/helpers/messages/facebookUrl';
import githubMessages from '@server/helpers/messages/githubUrl';
import twitterMessages from '@server/helpers/messages/twitterUrl';
import instagramMessages from '@server/helpers/messages/instagramUrl';
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
      .messages(emailMessages),
    facebook_url: Joi.string()
      .trim()
      .regex(facebookRegExp)
      .allow('')
      .required()
      .messages(facebookMessages),
    twitter_url: Joi.string()
      .trim()
      .regex(twitterRegExp)
      .allow('')
      .required()
      .messages(twitterMessages),
    instagram_url: Joi.string()
      .trim()
      .regex(instagramRegExp)
      .allow('')
      .required()
      .messages(instagramMessages),
    github_url: Joi.string()
      .trim()
      .regex(githubRegExp)
      .allow('')
      .required()
      .messages(githubMessages),
  });

  const { error: validationError, value: data } = schema.validate(contact, options);

  return { validationError, data };
};

export default validateContact;
