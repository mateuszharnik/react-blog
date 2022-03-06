export const isPublicRequired = {
  'any.required': 'Właściwość {#label} jest wymagana.',
};

export const isPublicBoolean = {
  'boolean.base': 'Opcja profil publiczny musi być typu logicznego.',
};

const isPublicMessages = {
  ...isPublicRequired,
  ...isPublicBoolean,
};

export default isPublicMessages;
