import Joi from 'joi';
import { nameRegExp, emailRegExp } from '@server/helpers/regexps';

const validateMessage = (message = {}) => {
  const schema = Joi.object().keys({
    first_name: Joi.string()
      .trim()
      .min(3)
      .max(32)
      .regex(nameRegExp)
      .required(),
    last_name: Joi.string()
      .trim()
      .min(3)
      .max(32)
      .regex(nameRegExp)
      .required(),
    email: Joi.string()
      .trim()
      .regex(emailRegExp)
      .required(),
    subject: Joi.string()
      .trim()
      .max(200)
      .required(),
    contents: Joi.string()
      .trim()
      .max(2000)
      .required(),
  });

  const { error: validationError, value: data } = schema.validate(message);

  return { validationError, data };
};

export default validateMessage;
