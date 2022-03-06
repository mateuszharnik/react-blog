export const showAuthorsRequired = {
  'any.required': 'Właściwość {#label} jest wymagana.',
};

export const showAuthorsBoolean = {
  'boolean.base': 'Opcja pokaż autorów musi być typu logicznego.',
};

const showAuthorsMessages = {
  ...showAuthorsRequired,
  ...showAuthorsBoolean,
};

export default showAuthorsMessages;
