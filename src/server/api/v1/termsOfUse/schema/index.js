import Joi from 'joi';

const validateTermsOfUse = (termsOfUse = {}, options = { abortEarly: false }) => {
  const schema = Joi.object().keys({
    contents: Joi.string()
      .trim()
      .min(3)
      .max(20000)
      .required()
      .messages(),
  });

  const { error: validationError, value: data } = schema.validate(termsOfUse, options);

  return { validationError, data };
};

export default validateTermsOfUse;
