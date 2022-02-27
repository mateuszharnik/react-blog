export const descriptionRequired = {
  'any.required': 'Opis roli użytkownika jest wymagany.',
};

export const descriptionNotEmpty = {
  'string.empty': 'Opis roli użytkownika nie może być pusty.',
};

export const descriptionString = {
  'string.base': 'Opis roli użytkownika musi być typu tekstowego.',
};

export const descriptionMin = {
  'string.min': 'Opis roli użytkownika musi mieć minimum 3 znaki.',
};

export const descriptionMax = {
  'string.max': 'Opis roli użytkownika może mieć maksymalnie 2000 znaków.',
};

const descriptionMessages = {
  ...descriptionRequired,
  ...descriptionNotEmpty,
  ...descriptionString,
  ...descriptionMin,
  ...descriptionMax,
};

export default descriptionMessages;
