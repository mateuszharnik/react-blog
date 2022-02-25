export const twitterRequired = {
  'any.required': 'Link do profilu Twitter jest wymagany.',
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
