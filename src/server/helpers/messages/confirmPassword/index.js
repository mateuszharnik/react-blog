export const confirmPasswordRequired = {
  'any.required': 'Powtórzone hasło jest wymagane.',
};

export const confirmPasswordNotEmpty = {
  'string.empty': 'Musisz powtórzyć hasło.',
};

export const confirmPasswordString = {
  'string.base': 'Powtórzone hasło musi być typu tekstowego.',
};

export const confirmPasswordInvalid = {
  'any.only': 'Hasła nie są takie same.',
};

const confirmPasswordMessages = {
  ...confirmPasswordRequired,
  ...confirmPasswordNotEmpty,
  ...confirmPasswordString,
  ...confirmPasswordInvalid,
};

export default confirmPasswordMessages;
