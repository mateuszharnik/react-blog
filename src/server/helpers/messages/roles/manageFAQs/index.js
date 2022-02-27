export const manageFAQsRequired = {
  'any.required': 'Opcja zarządzania najczęściej zadawanymi pytaniami jest wymagana.',
};

export const manageFAQsBoolean = {
  'boolean.base': 'Opcja zarządzania najczęściej zadawanymi pytaniami musi być typu logicznego.',
};

const manageFAQsMessages = {
  ...manageFAQsRequired,
  ...manageFAQsBoolean,
};

export default manageFAQsMessages;
