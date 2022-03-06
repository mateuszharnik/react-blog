export const manageCommentsRequired = {
  'any.required': 'Właściwość {#label} jest wymagana.',
};

export const manageCommentsBoolean = {
  'boolean.base': 'Opcja zarządzania komentarzami musi być typu logicznego.',
};

const manageCommentsMessages = {
  ...manageCommentsRequired,
  ...manageCommentsBoolean,
};

export default manageCommentsMessages;
