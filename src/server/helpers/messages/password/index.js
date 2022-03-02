export const passwordRequired = {
  'any.required': 'Hasło jest wymagane.',
};

export const passwordNotEmpty = {
  'string.empty': 'Hasło nie może być puste.',
};

export const passwordString = {
  'string.base': 'Hasło musi być typu tekstowego.',
};

export const passwordMin = {
  'string.min': 'Hasło musi mieć minimum 8 znaków.',
};

export const passwordMax = {
  'string.max': 'Hasło może mieć maksymalnie 32 znaki.',
};

const passwordMessages = {
  ...passwordRequired,
  ...passwordNotEmpty,
  ...passwordString,
  ...passwordMin,
  ...passwordMax,
};

export default passwordMessages;
