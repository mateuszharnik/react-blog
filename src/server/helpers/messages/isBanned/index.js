export const isBannedRequired = {
  'any.required': 'Opcja profil zablokowany jest wymagana.',
};

export const isBannedBoolean = {
  'boolean.base': 'Opcja profil zablokowany musi być typu logicznego.',
};

const isBannedMessages = {
  ...isBannedRequired,
  ...isBannedBoolean,
};

export default isBannedMessages;
