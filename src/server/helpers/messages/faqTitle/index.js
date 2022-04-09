export const faqTitleRequired = {
  'any.required': 'Właściwość {#label} jest wymagana.',
};

export const faqTitleNotEmpty = {
  'string.empty': 'Musisz podać tytuł pytania.',
};

export const faqTitleString = {
  'string.base': 'Tytuł pytania musi być typu tekstowego.',
};

export const faqTitleMin = {
  'string.min': 'Tytuł pytania może mieć maksymalnie 3 znaki.',
};

export const faqTitleMax = {
  'string.max': 'Tytuł pytania może mieć maksymalnie 1000 znaków.',
};

const faqTitleMessages = {
  ...faqTitleRequired,
  ...faqTitleNotEmpty,
  ...faqTitleString,
  ...faqTitleMin,
  ...faqTitleMax,
};

export default faqTitleMessages;
