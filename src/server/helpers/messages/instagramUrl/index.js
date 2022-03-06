export const instagramRequired = {
  'any.required': 'Właściwość {#label} jest wymagana.',
};

export const instagramString = {
  'string.base': 'Link do profilu Instagram musi być typu tekstowego.',
};

export const instagramPattern = {
  'string.pattern.base': 'Link do profilu Instagram jest nieprawidłowy.',
};

const instagramMessages = {
  ...instagramRequired,
  ...instagramString,
  ...instagramPattern,
};

export default instagramMessages;
