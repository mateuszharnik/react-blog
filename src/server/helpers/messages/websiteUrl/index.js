export const websiteRequired = {
  'any.required': 'Link do strony internetowej jest wymagany.',
};

export const websiteString = {
  'string.base': 'Link do strony internetowej musi być typu tekstowego.',
};

export const websitePattern = {
  'string.pattern.base': 'Link do strony internetowej jest nieprawidłowy.',
};

const websiteMessages = {
  ...websiteRequired,
  ...websiteString,
  ...websitePattern,
};

export default websiteMessages;
