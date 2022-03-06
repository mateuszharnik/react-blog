export const manageNewsletterRequired = {
  'any.required': 'Właściwość {#label} jest wymagana.',
};

export const manageNewsletterBoolean = {
  'boolean.base': 'Opcja zarządzania newsletterem musi być typu logicznego.',
};

const manageNewsletterMessages = {
  ...manageNewsletterRequired,
  ...manageNewsletterBoolean,
};

export default manageNewsletterMessages;
