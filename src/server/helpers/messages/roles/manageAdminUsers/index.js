export const manageAdminUsersRequired = {
  'any.required': 'Właściwość {#label} jest wymagana.',
};

export const manageAdminUsersBoolean = {
  'boolean.base': 'Opcja zarządzania użytkownikami administracyjnymi musi być typu logicznego.',
};

const manageAdminUsersMessages = {
  ...manageAdminUsersRequired,
  ...manageAdminUsersBoolean,
};

export default manageAdminUsersMessages;
