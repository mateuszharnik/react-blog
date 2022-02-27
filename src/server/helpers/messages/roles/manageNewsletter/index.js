export const manageNewsletterRequired = {
  'any.required': 'Opcja zarządzania newsletterem jest wymagana.',
};

export const manageNewsletterBoolean = {
  'boolean.base': 'Opcja zarządzania newsletterem musi być typu logicznego.',
};

const manageNewsletterMessages = {
  ...manageNewsletterRequired,
  ...manageNewsletterBoolean,
};

export default manageNewsletterMessages;
