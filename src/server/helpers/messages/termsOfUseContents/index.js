export const termsOfUseContentsRequired = {
  'any.required': 'Właściwość {#label} jest wymagana.',
};

export const termsOfUseContentsNotEmpty = {
  'string.empty': 'Musisz podać treść regulaminu.',
};

export const termsOfUseContentsString = {
  'string.base': 'Treść regulaminu musi być typu tekstowego.',
};

export const termsOfUseContentsMin = {
  'string.min': 'Treść regulaminu musi mieć minimum 3 znaki.',
};

export const termsOfUseContentsMax = {
  'string.max': 'Treść regulaminu może mieć maksymalnie 20000 znaków.',
};

const termsOfUseContentsMessages = {
  ...termsOfUseContentsRequired,
  ...termsOfUseContentsNotEmpty,
  ...termsOfUseContentsString,
  ...termsOfUseContentsMin,
  ...termsOfUseContentsMax,
};

export default termsOfUseContentsMessages;
