import Joi from 'joi';

const validateFAQ = (faq = {}, options = { abortEarly: false }) => {
  const schema = Joi.object().keys({
    title: Joi.string()
      .trim()
      .min(3)
      .max(1000)
      .required()
      .messages(),
    contents: Joi.string()
      .trim()
      .min(3)
      .max(20000)
      .required()
      .messages(),
  });

  const { error: validationError, value: data } = schema.validate(faq, options);

  return { validationError, data };
};

export default validateFAQ;
