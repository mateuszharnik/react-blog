export const manageConfigRequired = {
  'any.required': 'Właściwość {#label} jest wymagana.',
};

export const manageConfigBoolean = {
  'boolean.base': 'Opcja edytowania konfiguracji strony musi być typu logicznego.',
};

const manageConfigMessages = {
  ...manageConfigRequired,
  ...manageConfigBoolean,
};

export default manageConfigMessages;
