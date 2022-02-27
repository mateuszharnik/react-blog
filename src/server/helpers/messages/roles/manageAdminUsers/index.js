export const manageAdminUsersRequired = {
  'any.required': 'Opcja zarządzania użytkownikami administracyjnymi jest wymagana.',
};

export const manageAdminUsersBoolean = {
  'boolean.base': 'Opcja zarządzania użytkownikami administracyjnymi musi być typu logicznego.',
};

const manageAdminUsersMessages = {
  ...manageAdminUsersRequired,
  ...manageAdminUsersBoolean,
};

export default manageAdminUsersMessages;
