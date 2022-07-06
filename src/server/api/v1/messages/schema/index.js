import Joi from 'joi';
import firstNameMessages from '@server/helpers/messages/firstName';
import lastNameMessages from '@server/helpers/messages/lastName';
import emailMessages from '@server/helpers/messages/email';
import subjectMessages from '@server/helpers/messages/subject';
import messageContentsMessages from '@server/helpers/messages/messageContents';
import { nameRegExp, emailRegExp } from '@server/helpers/regexps';

const validateMessage = (message = {}, options = { abortEarly: false }) => {
  const schema = Joi.object().keys({
    first_name: Joi.string()
      .trim()
      .min(3)
      .max(32)
      .regex(nameRegExp)
      .required()
      .messages(firstNameMessages),
    last_name: Joi.string()
      .trim()
      .min(3)
      .max(32)
      .regex(nameRegExp)
      .required()
      .messages(lastNameMessages),
    email: Joi.string()
      .trim()
      .regex(emailRegExp)
      .required()
      .messages(emailMessages),
    subject: Joi.string()
      .trim()
      .max(200)
      .required()
      .messages(subjectMessages),
    contents: Joi.string()
      .trim()
      .max(2000)
      .required()
      .messages(messageContentsMessages),
  });

  const { error: validationError, value: data } = schema.validate(message, options);

  return { validationError, data };
};

export default validateMessage;
