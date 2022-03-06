export const isEmailPublicRequired = {
  'any.required': 'Właściwość {#label} jest wymagana.',
};

export const isEmailPublicBoolean = {
  'boolean.base': 'Opcja publiczny email użytkownika musi być typu logicznego.',
};

const isEmailPublicMessages = {
  ...isEmailPublicRequired,
  ...isEmailPublicBoolean,
};

export default isEmailPublicMessages;
