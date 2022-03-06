export const imageRequired = {
  'any.required': 'Właściwość {#label} jest wymagana.',
};

export const imageString = {
  'string.base': 'Link do awatara musi być typu tekstowego.',
};

export const imagePattern = {
  'string.pattern.base': 'Link do awatara jest nieprawidłowy.',
};

const imageMessages = {
  ...imageRequired,
  ...imageString,
  ...imagePattern,
};

export default imageMessages;
