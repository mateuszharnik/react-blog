export const manageFAQsRequired = {
  'any.required': 'Właściwość {#label} jest wymagana.',
};

export const manageFAQsBoolean = {
  'boolean.base': 'Opcja zarządzania najczęściej zadawanymi pytaniami musi być typu logicznego.',
};

const manageFAQsMessages = {
  ...manageFAQsRequired,
  ...manageFAQsBoolean,
};

export default manageFAQsMessages;
