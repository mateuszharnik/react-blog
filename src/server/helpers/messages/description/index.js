export const descriptionRequired = {
  'any.required': 'Właściwość {#label} jest wymagana.',
};

export const descriptionString = {
  'string.base': 'Opis musi być typu tekstowego.',
};

export const descriptionMax = {
  'string.max': 'Opis może mieć maksymalnie 3000 znaków.',
};

const descriptionMessages = {
  ...descriptionRequired,
  ...descriptionString,
  ...descriptionMax,
};

export default descriptionMessages;
