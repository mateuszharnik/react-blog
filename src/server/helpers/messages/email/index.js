export const emailRequired = {
  'any.required': 'Email jest wymagany.',
};

export const emailNotEmpty = {
  'string.empty': 'Email nie może być pusty.',
};

export const emailString = {
  'string.base': 'Email musi być typu tekstowego.',
};

export const emailPattern = {
  'string.pattern.base': 'Email jest nieprawidłowy.',
};

const emailMessages = {
  ...emailRequired,
  ...emailNotEmpty,
  ...emailString,
  ...emailPattern,
};

export default emailMessages;
