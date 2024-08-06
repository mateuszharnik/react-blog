import { thunk, action } from 'easy-peasy';
import { apiService } from '@client/services/apiService';
import { storeActions } from '@client/utils/storeUtils';

export const requestsNames = {
  SIGN_IN_REQUEST: 'signInRequest',
  GET_REFRESH_TOKEN_REQUEST: 'getRefreshTokenRequest',
};

export const docsStore = {
  hasAccess: false,
  requests: {},

  signInAction: thunk(storeActions.createAction({
    request: requestsNames.SIGN_IN_REQUEST,
    action: (_, { payload, options }) => apiService.publicDocs
      .signIn(payload, options),
  })),

  getRefreshTokenAction: thunk(storeActions.createAction({
    request: requestsNames.GET_REFRESH_TOKEN_REQUEST,
    onSuccess: 'setHasAccess',
    action: (_, { payload, options }) => apiService.publicDocs
      .getRefreshToken(payload, options),
  })),

  resetSignInMetadataAction: action(storeActions.onReset(
    requestsNames.SIGN_IN_REQUEST,
  )),

  resetGetRefreshTokenMetadataAction: action(storeActions.onReset(
    requestsNames.GET_REFRESH_TOKEN_REQUEST,
  )),

  onTrigger: action(storeActions.onTrigger()),

  onFetching: action(storeActions.onFetching()),

  onCanceled: action(storeActions.onCanceled()),

  onError: action(storeActions.onError()),

  onSuccess: action(storeActions.onSuccess()),

  setHasAccess: action(storeActions.onSuccess((state, { result }) => {
    state.hasAccess = result;
  })),

  reset: action((state) => {
    state.hasAccess = false;
  }),
};
