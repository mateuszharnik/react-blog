import Joi from 'joi';
import aboutContentsMessages from '@server/helpers/messages/aboutContents';

const validateAbout = (about = {}, options = { abortEarly: false }) => {
  const schema = Joi.object().keys({
    contents: Joi.string()
      .trim()
      .allow('')
      .max(20000)
      .required()
      .messages(aboutContentsMessages),
  });

  const { error: validationError, value: data } = schema.validate(about, options);

  return { validationError, data };
};

export default validateAbout;
