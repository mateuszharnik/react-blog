export const showEmailRequired = {
  'any.required': 'Właściwość {#label} jest wymagana.',
};

export const showEmailBoolean = {
  'boolean.base': 'Opcja pokaż adres email musi być typu logicznego.',
};

const showEmailMessages = {
  ...showEmailRequired,
  ...showEmailBoolean,
};

export default showEmailMessages;
