export const manageMessagesRequired = {
  'any.required': 'Właściwość {#label} jest wymagana.',
};

export const manageMessagesBoolean = {
  'boolean.base': 'Opcja zarządzania wiadomościami musi być typu logicznego.',
};

const manageMessagesMessages = {
  ...manageMessagesRequired,
  ...manageMessagesBoolean,
};

export default manageMessagesMessages;
