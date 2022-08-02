import Joi from 'joi';
import { dbIdRegExp } from '@shared/regexps';

const validateIds = (ids = []) => {
  const schema = Joi.array().items(
    Joi.string()
      .trim()
      .regex(dbIdRegExp)
      .required(),
  );

  const { error: validationError, value: data } = schema.validate(ids);

  return { validationError, data };
};

export default validateIds;
