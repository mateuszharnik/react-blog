export const faqContentsRequired = {
  'any.required': 'Właściwość {#label} jest wymagana.',
};

export const faqContentsNotEmpty = {
  'string.empty': 'Musisz podać treść pytania.',
};

export const faqContentsString = {
  'string.base': 'Treść pytania musi być typu tekstowego.',
};

export const faqContentsMin = {
  'string.min': 'Treść pytania może mieć maksymalnie 3 znaki.',
};

export const faqContentsMax = {
  'string.max': 'Treść pytania może mieć maksymalnie 20000 znaków.',
};

const faqContentsMessages = {
  ...faqContentsRequired,
  ...faqContentsNotEmpty,
  ...faqContentsString,
  ...faqContentsMin,
  ...faqContentsMax,
};

export default faqContentsMessages;
