export const messageContentsRequired = {
  'any.required': 'Właściwość {#label} jest wymagana.',
};

export const messageContentsNotEmpty = {
  'string.empty': 'Musisz podać treść wiadomości.',
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
