import { thunk, action } from 'easy-peasy';
import { apiService } from '@client/services/apiService';
import { storeActions } from '@client/utils/storeUtils';

export const requestsNames = {
  GET_CSRF_TOKEN_REQUEST: 'getCSRFTokenRequest',
};

export const csrfStore = {
  csrfToken: null,
  requests: {},

  getCSRFTokenAction: thunk(storeActions.createAction({
    request: requestsNames.GET_CSRF_TOKEN_REQUEST,
    action: (_, { options }) => apiService.publicCsrf.getCSRFToken(options),
  })),

  resetGetCSRFTokenMetadataAction: action(storeActions.onReset(
    requestsNames.GET_CSRF_TOKEN_REQUEST,
  )),

  onTrigger: action(storeActions.onTrigger()),

  onFetching: action(storeActions.onFetching()),

  onError: action(storeActions.onError()),

  onSuccess: action(storeActions.onSuccess((state, { result }) => {
    state.csrfToken = result?.CSRFToken;
  })),

  reset: action((state) => {
    state.csrfToken = null;
  }),
};
