export const manageCommentsRequired = {
  'any.required': 'Opcja zarządzania komentarzami jest wymagana.',
};

export const manageCommentsBoolean = {
  'boolean.base': 'Opcja zarządzania komentarzami musi być typu logicznego.',
};

const manageCommentsMessages = {
  ...manageCommentsRequired,
  ...manageCommentsBoolean,
};

export default manageCommentsMessages;
