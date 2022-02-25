export const showCommentsRequired = {
  'any.required': 'Opcja pokaż komentarze jest wymagana.',
};

export const showCommentsBoolean = {
  'boolean.base': 'Opcja pokaż komentarze musi być typu logicznego.',
};

const showCommentsMessages = {
  ...showCommentsRequired,
  ...showCommentsBoolean,
};

export default showCommentsMessages;
