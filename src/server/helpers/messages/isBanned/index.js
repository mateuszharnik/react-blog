export const isBannedRequired = {
  'any.required': 'Właściwość {#label} jest wymagana.',
};

export const isBannedBoolean = {
  'boolean.base': 'Opcja profil zablokowany musi być typu logicznego.',
};

const isBannedMessages = {
  ...isBannedRequired,
  ...isBannedBoolean,
};

export default isBannedMessages;
