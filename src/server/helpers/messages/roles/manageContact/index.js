export const manageContactRequired = {
  'any.required': 'Właściwość {#label} jest wymagana.',
};

export const manageContactBoolean = {
  'boolean.base': 'Opcja edytowania informacji kontaktowych musi być typu logicznego.',
};

const manageContactMessages = {
  ...manageContactRequired,
  ...manageContactBoolean,
};

export default manageContactMessages;
