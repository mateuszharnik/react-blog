export const twitchRequired = {
  'any.required': 'Link do kanału Twitch jest wymagany.',
};

export const twitchString = {
  'string.base': 'Link do kanału Twitch musi być typu tekstowego.',
};

export const twitchPattern = {
  'string.pattern.base': 'Link do kanału Twitch jest nieprawidłowy.',
};

const twitchMessages = {
  ...twitchRequired,
  ...twitchString,
  ...twitchPattern,
};

export default twitchMessages;
