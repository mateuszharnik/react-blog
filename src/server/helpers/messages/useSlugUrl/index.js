export const slugRequired = {
  'any.required': 'Opcja wyglądu adresu url do postu jest wymagana.',
};

export const slugBoolean = {
  'boolean.base': 'Opcja wyglądu adresu url do postu musi być typu logicznego.',
};

const slugMessages = {
  ...slugRequired,
  ...slugBoolean,
};

export default slugMessages;
