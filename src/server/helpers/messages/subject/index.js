export const subjectRequired = {
  'any.required': 'Temat jest wymagany.',
};

export const subjectNotEmpty = {
  'string.empty': 'Temat nie może być pusty.',
};

export const subjectString = {
  'string.base': 'Temat musi być typu tekstowego.',
};

export const subjectMax = {
  'string.max': 'Temat może mieć maksymalnie 200 znaków.',
};

const subjectMessages = {
  ...subjectRequired,
  ...subjectNotEmpty,
  ...subjectString,
  ...subjectMax,
};

export default subjectMessages;
