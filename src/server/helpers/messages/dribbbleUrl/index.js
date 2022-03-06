export const dribbbleRequired = {
  'any.required': 'Właściwość {#label} jest wymagana.',
};

export const dribbbleString = {
  'string.base': 'Link do profilu Dribbble musi być typu tekstowego.',
};

export const dribbblePattern = {
  'string.pattern.base': 'Link do profilu Dribbble jest nieprawidłowy.',
};

const dribbbleMessages = {
  ...dribbbleRequired,
  ...dribbbleString,
  ...dribbblePattern,
};

export default dribbbleMessages;
