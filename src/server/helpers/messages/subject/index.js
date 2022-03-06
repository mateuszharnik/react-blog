export const subjectRequired = {
  'any.required': 'Właściwość {#label} jest wymagana.',
};

export const subjectNotEmpty = {
  'string.empty': 'Musisz podać temat wiadomości.',
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
