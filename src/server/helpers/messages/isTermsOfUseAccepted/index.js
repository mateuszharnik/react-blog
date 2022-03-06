export const isTermsOfUseAcceptedRequired = {
  'any.required': 'Właściwość {#label} jest wymagana.',
};

export const isTermsOfUseAcceptedBoolean = {
  'boolean.base': 'Opcja akceptacji regulaminu musi być typu logicznego.',
};

export const isTermsOfUseAcceptedValid = {
  'any.only': 'Musisz zaakceptować regulamin.',
};

const isTermsOfUseAcceptedMessages = {
  ...isTermsOfUseAcceptedRequired,
  ...isTermsOfUseAcceptedBoolean,
  ...isTermsOfUseAcceptedValid,
};

export default isTermsOfUseAcceptedMessages;
