export const showEmailRequired = {
  'any.required': 'Opcja pokaż adres email jest wymagana.',
};

export const showEmailBoolean = {
  'boolean.base': 'Opcja pokaż adres email musi być typu logicznego.',
};

const showEmailMessages = {
  ...showEmailRequired,
  ...showEmailBoolean,
};

export default showEmailMessages;
