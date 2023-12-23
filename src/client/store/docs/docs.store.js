import { thunk, action } from 'easy-peasy';
import { apiService } from '@client/services/apiService';
import { storeActions } from '@client/utils/storeUtils';

export const requestsNames = {
  SIGN_IN_REQUEST: 'signInRequest',
  GET_REFRESH_TOKEN_REQUEST: 'getRefreshTokenRequest',
};

export const docsStore = {
  accessToken: '',
  requests: {},

  signInAction: thunk(storeActions.createAction({
    request: requestsNames.SIGN_IN_REQUEST,
    action: (_, { payload, options }) => apiService.docs.signIn(payload, options),
  })),

  getRefreshTokenAction: thunk(storeActions.createAction({
    request: requestsNames.GET_REFRESH_TOKEN_REQUEST,
    onSuccess: 'setAccessToken',
    action: (_, { options }) => apiService.docs.getRefreshToken(options),
  })),

  resetSignInMetadataAction: action(storeActions.onReset(
    requestsNames.SIGN_IN_REQUEST,
  )),

  resetGetRefreshTokenMetadataAction: action(storeActions.onReset(
    requestsNames.GET_REFRESH_TOKEN_REQUEST,
  )),

  onTrigger: action(storeActions.onTrigger()),

  onFetching: action(storeActions.onFetching()),

  onError: action(storeActions.onError()),

  onSuccess: action(storeActions.onSuccess()),

  setAccessToken: action(storeActions.onSuccess((state, { result }) => {
    state.accessToken = result;
  })),
};
