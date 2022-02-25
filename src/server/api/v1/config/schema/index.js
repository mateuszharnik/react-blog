import Joi from 'joi';
import slugMessages from '@server/helpers/messages/useSlugUrl';
import showAuthorsMessages from '@server/helpers/messages/showAuthors';
import showSocialMediaMessages from '@server/helpers/messages/showSocialMedia';
import showCommentsMessages from '@server/helpers/messages/showComments';

const validateConfig = (config = {}) => {
  const schema = Joi.object().keys({
    show_authors: Joi.boolean()
      .required()
      .messages(showAuthorsMessages),
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

  const { error: validationError, value: data } = schema.validate(config);

  return { validationError, data };
};

export default validateConfig;
