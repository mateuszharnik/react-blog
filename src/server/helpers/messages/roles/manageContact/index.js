export const manageContactRequired = {
  'any.required': 'Opcja edytowania informacji kontaktowych jest wymagana.',
};

export const manageContactBoolean = {
  'boolean.base': 'Opcja edytowania informacji kontaktowych musi być typu logicznego.',
};

const manageContactMessages = {
  ...manageContactRequired,
  ...manageContactBoolean,
};

export default manageContactMessages;
