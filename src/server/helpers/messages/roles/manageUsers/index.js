export const manageUsersRequired = {
  'any.required': 'Opcja zarządzania użytkownikami jest wymagana.',
};

export const manageUsersBoolean = {
  'boolean.base': 'Opcja zarządzania użytkownikami musi być typu logicznego.',
};

const manageUsersMessages = {
  ...manageUsersRequired,
  ...manageUsersBoolean,
};

export default manageUsersMessages;
