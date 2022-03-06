export const twitterRequired = {
  'any.required': 'Właściwość {#label} jest wymagana.',
};

export const twitterString = {
  'string.base': 'Link do profilu Twitter musi być typu tekstowego.',
};

export const twitterPattern = {
  'string.pattern.base': 'Link do profilu Twitter jest nieprawidłowy.',
};

const twitterMessages = {
  ...twitterRequired,
  ...twitterString,
  ...twitterPattern,
};

export default twitterMessages;
