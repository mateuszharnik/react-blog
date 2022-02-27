export const manageTagsRequired = {
  'any.required': 'Opcja zarządzania tagami jest wymagana.',
};

export const manageTagsBoolean = {
  'boolean.base': 'Opcja zarządzania tagami musi być typu logicznego.',
};

const manageTagsMessages = {
  ...manageTagsRequired,
  ...manageTagsBoolean,
};

export default manageTagsMessages;
