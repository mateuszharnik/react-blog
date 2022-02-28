import Joi from 'joi';
import termsOfUseContentsMessages from '@server/helpers/messages/termsOfUseContents';

const validateTermsOfUse = (termsOfUse = {}, options = {}) => {
  const schema = Joi.object().keys({
    contents: Joi.string()
      .trim()
      .min(3)
      .max(20000)
      .required()
      .messages(termsOfUseContentsMessages),
  });

  const { error: validationError, value: data } = schema.validate(termsOfUse, options);

  return { validationError, data };
};

export default validateTermsOfUse;
