export const manageConfigRequired = {
  'any.required': 'Opcja edytowania konfiguracji strony jest wymagana.',
};

export const manageConfigBoolean = {
  'boolean.base': 'Opcja edytowania konfiguracji strony musi być typu logicznego.',
};

const manageConfigMessages = {
  ...manageConfigRequired,
  ...manageConfigBoolean,
};

export default manageConfigMessages;
