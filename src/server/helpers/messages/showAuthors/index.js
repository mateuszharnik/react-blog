export const showAuthorsRequired = {
  'any.required': 'Opcja pokaż autorów jest wymagany.',
};

export const showAuthorsBoolean = {
  'boolean.base': 'Opcja pokaż autorów musi być typu logicznego.',
};

const showAuthorsMessages = {
  ...showAuthorsRequired,
  ...showAuthorsBoolean,
};

export default showAuthorsMessages;
