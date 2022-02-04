import Joi from 'joi';
import { dbIdRegExp } from '@server/helpers/regexps';

const validateId = (id = '') => {
  const schema = Joi.string()
    .trim()
    .regex(dbIdRegExp)
    .required();

  const { error: validationError, value: data } = schema.validate(id);

  return { validationError, data };
};

export default validateId;
