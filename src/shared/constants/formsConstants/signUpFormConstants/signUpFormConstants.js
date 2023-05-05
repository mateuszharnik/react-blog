import { alphanumRegExp, emailRegExp } from '@shared/regexps';

export default {
  USERNAME: {
    MIN_LENGTH: 3,
    MAX_LENGTH: 32,
    REGEXP: alphanumRegExp,
  },

  EMAIL: {
    REGEXP: emailRegExp,
  },

  PASSWORD: {
    MIN_LENGTH: 8,
    MAX_LENGTH: 32,
  },
};
