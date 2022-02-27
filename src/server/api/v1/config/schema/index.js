import Joi from 'joi';
import slugMessages from '@server/helpers/messages/useSlugUrl';
import showAuthorsMessages from '@server/helpers/messages/showAuthors';
import showSocialMediaMessages from '@server/helpers/messages/showSocialMedia';
import showCommentsMessages from '@server/helpers/messages/showComments';
import showEmailMessages from '@server/helpers/messages/showEmail';

const validateConfig = (config = {}, options = {}) => {
  const schema = Joi.object().keys({
    show_authors: Joi.boolean()
      .required()
      .messages(showAuthorsMessages),
    show_email: Joi.boolean()
      .required()
      .messages(showEmailMessages),
    show_social_media: Joi.boolean()
      .required()
      .messages(showSocialMediaMessages),
    show_comments: Joi.boolean()
      .required()
      .messages(showCommentsMessages),
    use_slug_url: Joi.boolean()
      .required()
      .messages(slugMessages),
  });

  const { error: validationError, value: data } = schema.validate(config, options);

  return { validationError, data };
};

export default validateConfig;
