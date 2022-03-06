export const emailRequired = {
  'any.required': 'Właściwość {#label} jest wymagana.',
};

export const emailNotEmpty = {
  'string.empty': 'Musisz podać adres email.',
};

export const emailString = {
  'string.base': 'Adres email musi być typu tekstowego.',
};

export const emailPattern = {
  'string.pattern.base': 'Adres email jest nieprawidłowy.',
};

const emailMessages = {
  ...emailRequired,
  ...emailNotEmpty,
  ...emailString,
  ...emailPattern,
};

export default emailMessages;
