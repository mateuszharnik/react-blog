export const githubRequired = {
  'any.required': 'Link do profilu Github jest wymagany.',
};

export const githubString = {
  'string.base': 'Link do profilu Github musi być typu tekstowego.',
};

export const githubPattern = {
  'string.pattern.base': 'Link do profilu Github jest nieprawidłowy.',
};

const githubMessages = {
  ...githubRequired,
  ...githubString,
  ...githubPattern,
};

export default githubMessages;
