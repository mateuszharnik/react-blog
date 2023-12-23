import { thunk, action } from 'easy-peasy';
import { apiService } from '@client/services/apiService';
import { storeActions } from '@client/utils/storeUtils';

export const requestsNames = {
  GET_CSRF_TOKEN_REQUEST: 'getCSRFTokenRequest',
};

export const csrfStore = {
  requests: {},

  getCSRFTokenAction: thunk(storeActions.createAction({
    request: requestsNames.GET_CSRF_TOKEN_REQUEST,
    action: async (_, { options }) => {
      const response = await apiService.csrf.getCSRFToken(options);

      return response;
    },
  })),

  resetGetCSRFTokenMetadataAction: action(storeActions.onReset(
    requestsNames.GET_CSRF_TOKEN_REQUEST,
  )),

  onTrigger: action(storeActions.onTrigger()),

  onFetching: action(storeActions.onFetching()),

  onError: action(storeActions.onError()),

  onSuccess: action(storeActions.onSuccess()),
};
