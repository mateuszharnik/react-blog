import Joi from 'joi';
import contentsMessages from '@server/helpers/messages/contents';

const validateAbout = (about = {}, options = {}) => {
  const schema = Joi.object().keys({
    contents: Joi.string()
      .trim()
      .allow('')
      .required()
      .messages(contentsMessages),
  });

  const { error: validationError, value: data } = schema.validate(about, options);

  return { validationError, data };
};

export default validateAbout;
