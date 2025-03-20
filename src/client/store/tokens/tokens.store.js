import decode from 'jwt-decode';
import { thunk, action } from 'easy-peasy';
import { apiService } from '@client/services/apiService';
import { storeActions } from '@client/utils/storeUtils';

export const requestsNames = {
  GET_REFRESH_TOKEN_REQUEST: 'getRefreshTokenRequest',
  GET_LOGGED_USER_REQUEST: 'getLoggedUserRequest',
  REVOKE_REFRESH_TOKEN_REQUEST: 'revokeRefreshTokenRequest',
};

export const tokensStore = {
  accessToken: null,
  requests: {},

  getRefreshTokenAction: thunk(storeActions.createAction({
    request: requestsNames.GET_REFRESH_TOKEN_REQUEST,
    onSuccess: 'setAccessToken',
    action: async (_, { payload, options }, { getStoreState }) => {
      const response = await apiService.publicAuth.getRefreshToken(payload, options, false);

      const { user } = getStoreState().userStore;

      if (response.data && user) {
        const data = decode(response.data);

        if (data?.id !== user?.id) window.location.reload(true);
      }

      return response;
    },
  })),

  getLoggedUserAction: thunk(storeActions.createAction({
    request: requestsNames.GET_LOGGED_USER_REQUEST,
    onSuccess: 'setAccessToken',
    action: async (_, { payload, options }) => apiService.publicAuth
      .getRefreshToken(payload, options, true),
  })),

  revokeRefreshTokenAction: thunk(storeActions.createAction({
    request: requestsNames.REVOKE_REFRESH_TOKEN_REQUEST,
    onSuccess: 'setAccessToken',
    action: async (_, { payload, options }) => apiService.privateAuth
      .revokeRefreshToken(payload, options),
  })),

  resetGetRefreshTokenMetadataAction: action(storeActions.onReset(
    requestsNames.GET_REFRESH_TOKEN_REQUEST,
  )),

  resetGetLoggedUserMetadataAction: action(storeActions.onReset(
    requestsNames.GET_LOGGED_USER_REQUEST,
  )),

  resetRevokeRefreshTokenMetadataAction: action(storeActions.onReset(
    requestsNames.REVOKE_REFRESH_TOKEN_REQUEST,
  )),

  onTrigger: action(storeActions.onTrigger()),

  onFetching: action(storeActions.onFetching()),

  onCanceled: action(storeActions.onCanceled()),

  onError: action(storeActions.onError()),

  onSuccess: action(storeActions.onSuccess()),

  setAccessToken: action(storeActions.onSuccess((state, { result }) => {
    state.accessToken = result;
  })),

  reset: action((state) => {
    state.accessToken = null;
  }),
};
