export const contentsRequired = {
  'any.required': 'Treść strony jest wymagana.',
};

export const contentsNotEmpty = {
  'string.empty': 'Treść strony nie może być pusta.',
};

export const contentsString = {
  'string.base': 'Treść strony musi być typu tekstowego.',
};

const contentsMessages = {
  ...contentsRequired,
  ...contentsNotEmpty,
  ...contentsString,
};

export default contentsMessages;
