import Joi from 'joi';
import invalidUsernames from '@server/helpers/validation/invalidUsernames';
import usernameMessages from '@server/helpers/messages/username';
import passwordMessages from '@server/helpers/messages/password';
import descriptionMessages from '@server/helpers/messages/description';
import emailMessages from '@server/helpers/messages/email';
import genderMessages from '@server/helpers/messages/gender';
import youtubeMessages from '@server/helpers/messages/youtubeUrl';
import facebookMessages from '@server/helpers/messages/facebookUrl';
import githubMessages from '@server/helpers/messages/githubUrl';
import twitterMessages from '@server/helpers/messages/twitterUrl';
import instagramMessages from '@server/helpers/messages/instagramUrl';
import dribbbleMessages from '@server/helpers/messages/dribbbleUrl';
import stackOverflowMessages from '@server/helpers/messages/stackOverflowUrl';
import linkedinMessages from '@server/helpers/messages/linkedinUrl';
import twitchMessages from '@server/helpers/messages/twitchUrl';
import imageMessages from '@server/helpers/messages/imageUrl';
import websiteMessages from '@server/helpers/messages/websiteUrl';
import isPublicMessages from '@server/helpers/messages/isPublic';
import isBannedMessages from '@server/helpers/messages/isBanned';
import isTermsOfUseAcceptedMessages from '@server/helpers/messages/isTermsOfUseAccepted';
import isEmailPublicMessages from '@server/helpers/messages/isEmailPublic';
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
} from '@server/helpers/regexps';

const validateUser = (user = {}, options = {}, useInvalid = true) => {
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
    description: Joi.string()
      .trim()
      .max(3000)
      .allow('')
      .required()
      .messages(descriptionMessages),
    gender: Joi.string()
      .trim()
      .valid('female', 'male')
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
    facebook_url: Joi.string()
      .trim()
      .regex(facebookRegExp)
      .allow('')
      .required()
      .messages(facebookMessages),
    dribbble_url: Joi.string()
      .trim()
      .regex(dribbbleRegExp)
      .allow('')
      .required()
      .messages(dribbbleMessages),
    youtube_url: Joi.string()
      .trim()
      .regex(youtubeRegExp)
      .allow('')
      .required()
      .messages(youtubeMessages),
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
    linkedin_url: Joi.string()
      .trim()
      .regex(linkedinRegExp)
      .allow('')
      .required()
      .messages(linkedinMessages),
    stack_overflow_url: Joi.string()
      .trim()
      .regex(stackOverflowRegExp)
      .allow('')
      .required()
      .messages(stackOverflowMessages),
    twitch_url: Joi.string()
      .trim()
      .regex(twitchRegExp)
      .allow('')
      .required()
      .messages(twitchMessages),
    website_url: Joi.string()
      .trim()
      .regex(websiteRegExp)
      .allow('')
      .required()
      .messages(websiteMessages),
    image_url: Joi.string()
      .trim()
      .regex(imageRegExp)
      .allow('')
      .required()
      .messages(imageMessages),
    is_terms_of_use_accepted: Joi.boolean()
      .valid(true)
      .required()
      .messages(isTermsOfUseAcceptedMessages),
    is_public: Joi.boolean()
      .required()
      .messages(isPublicMessages),
    is_email_public: Joi.boolean()
      .required()
      .messages(isEmailPublicMessages),
    is_banned: Joi.boolean()
      .required()
      .messages(isBannedMessages),
  });

  const { error: validationError, value: data } = schema.validate(user, options);

  return { validationError, data };
};

export default validateUser;
