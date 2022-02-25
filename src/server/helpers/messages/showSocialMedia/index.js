export const showSocialMediaRequired = {
  'any.required': 'Opcja pokaż media społecznościowe jest wymagana.',
};

export const showSocialMediaBoolean = {
  'boolean.base': 'Opcja pokaż media społecznościowe musi być typu logicznego.',
};

const showSocialMediaMessages = {
  ...showSocialMediaRequired,
  ...showSocialMediaBoolean,
};

export default showSocialMediaMessages;
