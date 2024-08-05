import Joi from 'joi';
import { nameRegExp, emailRegExp } from '@shared/regexps';

const validateMessage = (message = {}, options = { abortEarly: false }) => {
  const schema = Joi.object().keys({
    first_name: Joi.string()
      .trim()
      .min(3)
      .max(32)
      .regex(nameRegExp)
      .required()
      .messages(),
    last_name: Joi.string()
      .trim()
      .min(3)
      .max(32)
      .regex(nameRegExp)
      .required()
      .messages(),
    email: Joi.string()
      .trim()
      .regex(emailRegExp)
      .required()
      .messages(),
    subject: Joi.string()
      .trim()
      .max(200)
      .required()
      .messages(),
    contents: Joi.string()
      .trim()
      .max(2000)
      .required()
      .messages(),
  });

  const { error: validationError, value: data } = schema.validate(message, options);

  return { validationError, data };
};

export default validateMessage;
