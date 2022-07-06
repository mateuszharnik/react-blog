import Joi from 'joi';
import faqTitleMessages from '@server/helpers/messages/faqTitle';
import faqContentsMessages from '@server/helpers/messages/faqContents';

const validateFAQ = (faq = {}, options = { abortEarly: false }) => {
  const schema = Joi.object().keys({
    title: Joi.string()
      .trim()
      .min(3)
      .max(1000)
      .required()
      .messages(faqTitleMessages),
    contents: Joi.string()
      .trim()
      .min(3)
      .max(20000)
      .required()
      .messages(faqContentsMessages),
  });

  const { error: validationError, value: data } = schema.validate(faq, options);

  return { validationError, data };
};

export default validateFAQ;
