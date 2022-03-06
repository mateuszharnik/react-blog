export const facebookRequired = {
  'any.required': 'Właściwość {#label} jest wymagana.',
};

export const facebookString = {
  'string.base': 'Link do profilu Facebook musi być typu tekstowego.',
};

export const facebookPattern = {
  'string.pattern.base': 'Link do profilu Facebook jest nieprawidłowy.',
};

const facebookMessages = {
  ...facebookRequired,
  ...facebookString,
  ...facebookPattern,
};

export default facebookMessages;
