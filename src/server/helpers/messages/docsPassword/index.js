export const docsPasswordRequired = {
  'any.required': 'Właściwość {#label} jest wymagana.',
};

export const docsPasswordBoolean = {
  'boolean.base': 'Opcja hasła dla dokumentacji musi być typu logicznego.',
};

const docsPasswordMessages = {
  ...docsPasswordRequired,
  ...docsPasswordBoolean,
};

export default docsPasswordMessages;
