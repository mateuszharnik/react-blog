export const manageRolesRequired = {
  'any.required': 'Opcja zarządzania rolami użytkowników jest wymagana.',
};

export const manageRolesBoolean = {
  'boolean.base': 'Opcja zarządzania rolami użytkowników musi być typu logicznego.',
};

const manageRolesMessages = {
  ...manageRolesRequired,
  ...manageRolesBoolean,
};

export default manageRolesMessages;
