export const manageCategoriesRequired = {
  'any.required': 'Opcja zarządzania kategoriami jest wymagana.',
};

export const manageCategoriesBoolean = {
  'boolean.base': 'Opcja zarządzania kategoriami musi być typu logicznego.',
};

const manageCategoriesMessages = {
  ...manageCategoriesRequired,
  ...manageCategoriesBoolean,
};

export default manageCategoriesMessages;
