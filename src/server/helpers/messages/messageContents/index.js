export const messageContentsRequired = {
  'any.required': 'Treść wiadomości jest wymagana.',
};

export const messageContentsNotEmpty = {
  'string.empty': 'Treść wiadomości nie może być pusta.',
};

export const messageContentsString = {
  'string.base': 'Treść wiadomości musi być typu tekstowego.',
};

export const messageContentsMax = {
  'string.max': 'Treść wiadomości może mieć maksymalnie 2000 znaków.',
};

const messageContentsMessages = {
  ...messageContentsRequired,
  ...messageContentsNotEmpty,
  ...messageContentsString,
  ...messageContentsMax,
};

export default messageContentsMessages;
