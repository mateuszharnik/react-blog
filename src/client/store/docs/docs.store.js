import { thunk, action } from 'easy-peasy';
import { apiService } from '@client/services/apiService';
import { storeActions } from '@client/utils/storeUtils';

const eventsNames = {
  SIGN_IN_EVENT: 'signInEvent',
  GET_REFRESH_TOKEN_EVENT: 'getRefreshTokenEvent',
};

export const docsStore = {
  accessToken: '',
  events: {},

  signInAction: thunk(storeActions.createAction({
    event: eventsNames.SIGN_IN_EVENT,
    action: (_, { payload, options }) => apiService.docs.signIn(payload, options),
  })),

  getRefreshTokenAction: thunk(storeActions.createAction({
    event: eventsNames.GET_REFRESH_TOKEN_EVENT,
    onSuccess: 'setAccessToken',
    action: (_, { options }) => apiService.docs.getRefreshToken(options),
  })),

  resetSignInMetadataAction: action(storeActions.onReset(eventsNames.SIGN_IN_EVENT)),

  resetGetRefreshTokenMetadataAction: action(storeActions.onReset(
    eventsNames.GET_REFRESH_TOKEN_EVENT,
  )),

  onTrigger: action(storeActions.onTrigger()),

  onFetching: action(storeActions.onFetching()),

  onError: action(storeActions.onError()),

  onSuccess: action(storeActions.onSuccess()),

  setAccessToken: action(storeActions.onSuccess((state, { result }) => {
    state.accessToken = result;
  })),
};
