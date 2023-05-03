import { emailRegExp, nameRegExp } from '@shared/regexps';

export default {
  FIRST_NAME: {
    MIN_LENGTH: 3,
    MAX_LENGTH: 32,
    REGEXP: nameRegExp,
  },

  LAST_NAME: {
    MIN_LENGTH: 3,
    MAX_LENGTH: 32,
    REGEXP: nameRegExp,
  },

  EMAIL: {
    REGEXP: emailRegExp,
  },

  SUBJECT: {
    MAX_LENGTH: 200,
  },

  CONTENTS: {
    MAX_LENGTH: 2000,
  },
};
