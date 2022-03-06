export const linkedinRequired = {
  'any.required': 'Właściwość {#label} jest wymagana.',
};

export const linkedinString = {
  'string.base': 'Link do profilu LinkedIn musi być typu tekstowego.',
};

export const linkedinPattern = {
  'string.pattern.base': 'Link do profilu LinkedIn jest nieprawidłowy.',
};

const linkedinMessages = {
  ...linkedinRequired,
  ...linkedinString,
  ...linkedinPattern,
};

export default linkedinMessages;
