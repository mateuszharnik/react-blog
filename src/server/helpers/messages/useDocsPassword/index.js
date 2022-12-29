export const useDocsPasswordRequired = {
  'any.required': 'Właściwość {#label} jest wymagana.',
};

export const useDocsPasswordBoolean = {
  'boolean.base': 'Opcja hasła dla dokumentacji musi być typu logicznego.',
};

const useDocsPasswordMessages = {
  ...useDocsPasswordRequired,
  ...useDocsPasswordBoolean,
};

export default useDocsPasswordMessages;
