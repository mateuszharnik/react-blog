export const youtubeRequired = {
  'any.required': 'Link do kanału Youtube jest wymagany.',
};

export const youtubeString = {
  'string.base': 'Link do kanału Youtube musi być typu tekstowego.',
};

export const youtubePattern = {
  'string.pattern.base': 'Link do kanału Youtube jest nieprawidłowy.',
};

const youtubeMessages = {
  ...youtubeRequired,
  ...youtubeString,
  ...youtubePattern,
};

export default youtubeMessages;
