export const nameRequired = {
  'any.required': 'Właściwość {#label} jest wymagana.',
};

export const nameNotEmpty = {
  'string.empty': 'Musisz podać nazwę roli użytkownika.',
};

export const nameString = {
  'string.base': 'Nazwa roli użytkownika musi być typu tekstowego.',
};

export const nameInvalid = {
  'any.invalid': 'Nie można utworzyć roli użytkownika o takiej nazwie.',
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
