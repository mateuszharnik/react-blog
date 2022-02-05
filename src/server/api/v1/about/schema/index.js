import Joi from 'joi';
import contentsMessages from '@server/helpers/messages/contents';

const validateAbout = (about = {}) => {
  const schema = Joi.object().keys({
    contents: Joi.string()
      .trim()
      .required()
      .messages(contentsMessages),
  });

  const { error: validationError, value: data } = schema.validate(about);

  return { validationError, data };
};

export default validateAbout;
