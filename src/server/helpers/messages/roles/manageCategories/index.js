export const manageCategoriesRequired = {
  'any.required': 'Właściwość {#label} jest wymagana.',
};

export const manageCategoriesBoolean = {
  'boolean.base': 'Opcja zarządzania kategoriami musi być typu logicznego.',
};

const manageCategoriesMessages = {
  ...manageCategoriesRequired,
  ...manageCategoriesBoolean,
};

export default manageCategoriesMessages;
