import { thunk, action } from 'easy-peasy';
import { apiService } from '@client/services/apiService';
import { storeActions } from '@client/utils/storeUtils';

const eventsNames = {
  GET_REFRESH_TOKEN_EVENT: 'getRefreshTokenEvent',
};

export const tokensStore = {
  accessToken: '',
  events: {},

  getRefreshTokenAction: thunk(storeActions.createAction({
    event: eventsNames.GET_REFRESH_TOKEN_EVENT,
    onSuccess: 'setAccessToken',
    action: async (_, { options }, { getStoreActions }) => {
      const response = await apiService.auth.getRefreshToken(options);

      getStoreActions().userStore.setUser({ result: response?.data });

      return response;
    },
  })),

  resetGetRefreshTokenMetadataAction: action(storeActions.onReset(
    eventsNames.GET_REFRESH_TOKEN_EVENT,
  )),

  onTrigger: action(storeActions.onTrigger()),

  onFetching: action(storeActions.onFetching()),

  onError: action(storeActions.onError()),

  onSuccess: action(storeActions.onSuccess()),

  setAccessToken: action(storeActions.onSuccess((state, { result }) => {
    state.accessToken = result.accessToken;
  })),
};
