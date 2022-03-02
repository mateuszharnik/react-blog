export const stackOverflowRequired = {
  'any.required': 'Link do profilu Stack Overflow jest wymagany.',
};

export const stackOverflowString = {
  'string.base': 'Link do profilu Stack Overflow musi być typu tekstowego.',
};

export const stackOverflowPattern = {
  'string.pattern.base': 'Link do profilu Stack Overflow jest nieprawidłowy.',
};

const stackOverflowMessages = {
  ...stackOverflowRequired,
  ...stackOverflowString,
  ...stackOverflowPattern,
};

export default stackOverflowMessages;
