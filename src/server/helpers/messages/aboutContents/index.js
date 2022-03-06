export const aboutContentsRequired = {
  'any.required': 'Właściwość {#label} jest wymagana.',
};

export const aboutContentsString = {
  'string.base': 'Treść strony musi być typu tekstowego.',
};

export const aboutContentsMax = {
  'string.max': 'Treść strony może mieć maksymalnie 20000 znaków.',
};

const aboutContentsMessages = {
  ...aboutContentsRequired,
  ...aboutContentsString,
  ...aboutContentsMax,
};

export default aboutContentsMessages;
