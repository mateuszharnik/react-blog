export const manageTagsRequired = {
  'any.required': 'Właściwość {#label} jest wymagana.',
};

export const manageTagsBoolean = {
  'boolean.base': 'Opcja zarządzania tagami musi być typu logicznego.',
};

const manageTagsMessages = {
  ...manageTagsRequired,
  ...manageTagsBoolean,
};

export default manageTagsMessages;
