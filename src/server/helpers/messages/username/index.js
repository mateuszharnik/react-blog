export const usernameRequired = {
  'any.required': 'Nazwa użytkownika jest wymagana.',
};

export const usernameNotEmpty = {
  'string.empty': 'Nazwa użytkownika nie może być pusta.',
};

export const usernameString = {
  'string.base': 'Nazwa użytkownika musi być typu tekstowego.',
};

export const usernameInvalid = {
  'any.invalid': 'Nie możesz użyć takiej nazwy użytkownika.',
};

export const usernameAlphanum = {
  'string.alphanum': 'Nazwa użytkownika może zawierać tylko cyfry oraz małe i duże litery.',
};

export const usernamePattern = {
  'string.pattern.base': 'Adres email jest nieprawidłowy.',
};

export const usernameMin = {
  'string.min': 'Nazwa użytkownika musi mieć minimum 3 znaki.',
};

export const usernameMax = {
  'string.max': 'Nazwa użytkownika może mieć maksymalnie 32 znaki.',
};

const usernameMessages = {
  ...usernameRequired,
  ...usernameNotEmpty,
  ...usernameString,
  ...usernameInvalid,
  ...usernameAlphanum,
  ...usernameMin,
  ...usernameMax,
  ...usernamePattern,
};

export default usernameMessages;
