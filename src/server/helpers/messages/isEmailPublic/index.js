export const isEmailPublicRequired = {
  'any.required': 'Opcja publiczny email użytkownika jest wymagana.',
};

export const isEmailPublicBoolean = {
  'boolean.base': 'Opcja publiczny email użytkownika musi być typu logicznego.',
};

const isEmailPublicMessages = {
  ...isEmailPublicRequired,
  ...isEmailPublicBoolean,
};

export default isEmailPublicMessages;
