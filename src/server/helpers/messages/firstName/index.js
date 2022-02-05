export const firstNameRequired = {
  'any.required': 'Imię jest wymagane.',
};

export const firstNameNotEmpty = {
  'string.empty': 'Imię nie może być puste.',
};

export const firstNameString = {
  'string.base': 'Imię musi być typu tekstowego.',
};

export const firstNamePattern = {
  'string.pattern.base': 'Imię jest nieprawidłowe.',
};

export const firstNameMin = {
  'string.min': 'Imię musi mieć minimum 3 znaki.',
};

export const firstNameMax = {
  'string.max': 'Imię może mieć maksymalnie 32 znaki.',
};

const firstNameMessages = {
  ...firstNameRequired,
  ...firstNameNotEmpty,
  ...firstNameString,
  ...firstNamePattern,
  ...firstNameMin,
  ...firstNameMax,
};

export default firstNameMessages;
