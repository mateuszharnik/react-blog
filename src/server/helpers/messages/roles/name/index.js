export const nameRequired = {
  'any.required': 'Nazwa roli użytkownika jest wymagana.',
};

export const nameNotEmpty = {
  'string.empty': 'Nazwa roli użytkownika nie może być pusta.',
};

export const nameString = {
  'string.base': 'Nazwa roli użytkownika musi być typu tekstowego.',
};

export const nameInvalid = {
  'any.invalid': 'Nie można utworzyć roli o takiej nazwie.',
};

export const nameMin = {
  'string.min': 'Nazwa roli użytkownika musi mieć minimum 3 znaki.',
};

export const nameMax = {
  'string.max': 'Nazwa roli użytkownika może mieć maksymalnie 100 znaków.',
};

const nameMessages = {
  ...nameRequired,
  ...nameNotEmpty,
  ...nameString,
  ...nameInvalid,
  ...nameMin,
  ...nameMax,
};

export default nameMessages;
