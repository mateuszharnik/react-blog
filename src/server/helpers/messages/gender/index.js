export const genderRequired = {
  'any.required': 'Płeć jest wymagana.',
};

export const genderNotEmpty = {
  'string.empty': 'Płeć nie może być pusta.',
};

export const genderString = {
  'string.base': 'Płeć musi być typu tekstowego.',
};

export const genderInvalid = {
  'any.invalid': 'Musisz wybrać między kobietą a mężczyzną.',
};

const genderMessages = {
  ...genderRequired,
  ...genderNotEmpty,
  ...genderString,
  ...genderInvalid,
};

export default genderMessages;
