export const stackOverflowRequired = {
  'any.required': 'Właściwość {#label} jest wymagana.',
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
