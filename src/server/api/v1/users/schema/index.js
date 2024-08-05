import Joi from 'joi';
import invalidUsernames from '@server/helpers/validation/invalidUsernames';
import {
  instagramRegExp,
  emailRegExp,
  imageRegExp,
  facebookRegExp,
  dribbbleRegExp,
  twitterRegExp,
  youtubeRegExp,
  websiteRegExp,
  githubRegExp,
  twitchRegExp,
  stackOverflowRegExp,
  linkedinRegExp,
} from '@shared/regexps';

const validateUser = (user = {}, options = { abortEarly: false }, useInvalid = true) => {
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
    description: Joi.string()
      .trim()
      .max(3000)
      .allow('')
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
    facebook_url: Joi.string()
      .trim()
      .regex(facebookRegExp)
      .allow('')
      .required()
      .messages(),
    dribbble_url: Joi.string()
      .trim()
      .regex(dribbbleRegExp)
      .allow('')
      .required()
      .messages(),
    youtube_url: Joi.string()
      .trim()
      .regex(youtubeRegExp)
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
    linkedin_url: Joi.string()
      .trim()
      .regex(linkedinRegExp)
      .allow('')
      .required()
      .messages(),
    stack_overflow_url: Joi.string()
      .trim()
      .regex(stackOverflowRegExp)
      .allow('')
      .required()
      .messages(),
    twitch_url: Joi.string()
      .trim()
      .regex(twitchRegExp)
      .allow('')
      .required()
      .messages(),
    website_url: Joi.string()
      .trim()
      .regex(websiteRegExp)
      .allow('')
      .required()
      .messages(),
    image_url: Joi.string()
      .trim()
      .regex(imageRegExp)
      .allow('')
      .required()
      .messages(),
    is_terms_of_use_accepted: Joi.boolean()
      .valid(true)
      .required()
      .messages(),
    is_public: Joi.boolean()
      .required()
      .messages(),
    is_email_public: Joi.boolean()
      .required()
      .messages(),
    is_banned: Joi.boolean()
      .required()
      .messages(),
  });

  const { error: validationError, value: data } = schema.validate(user, options);

  return { validationError, data };
};

export default validateUser;
