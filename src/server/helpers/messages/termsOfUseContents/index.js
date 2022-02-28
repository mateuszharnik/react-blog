export const termsOfUseContentsRequired = {
  'any.required': 'Treść regulaminu jest wymagana.',
};

export const termsOfUseContentsNotEmpty = {
  'string.empty': 'Treść regulaminu nie może być pusta.',
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
