export const managePostsRequired = {
  'any.required': 'Opcja zarządzania postami jest wymagana.',
};

export const managePostsBoolean = {
  'boolean.base': 'Opcja zarządzania postami musi być typu logicznego.',
};

const managePostsMessages = {
  ...managePostsRequired,
  ...managePostsBoolean,
};

export default managePostsMessages;
