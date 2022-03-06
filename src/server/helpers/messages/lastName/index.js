export const lastNameRequired = {
  'any.required': 'Właściwość {#label} jest wymagana.',
};

export const lastNameNotEmpty = {
  'string.empty': 'Musisz podać nazwisko.',
};

export const lastNameString = {
  'string.base': 'Nazwisko musi być typu tekstowego.',
};

export const lastNamePattern = {
  'string.pattern.base': 'Nazwisko jest nieprawidłowe.',
};

export const lastNameMin = {
  'string.min': 'Nazwisko musi mieć minimum 3 znaki.',
};

export const lastNameMax = {
  'string.max': 'Nazwisko może mieć maksymalnie 32 znaki.',
};

const lastNameMessages = {
  ...lastNameRequired,
  ...lastNameNotEmpty,
  ...lastNameString,
  ...lastNamePattern,
  ...lastNameMin,
  ...lastNameMax,
};

export default lastNameMessages;
