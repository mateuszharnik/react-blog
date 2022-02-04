import Joi from 'joi';

const validateAbout = (about = {}) => {
  const schema = Joi.object().keys({
    contents: Joi.string()
      .trim()
      .required(),
  });

  const { error: validationError, value: data } = schema.validate(about);

  return { validationError, data };
};

export default validateAbout;
