import { thunk, action } from 'easy-peasy';
import { apiService } from '@client/services/apiService';
import { storeActions } from '@client/utils/storeUtils';

export const requestsNames = {
  GET_REFRESH_TOKEN_REQUEST: 'getRefreshTokenRequest',
};

export const tokensStore = {
  accessToken: null,
  requests: {},

  getRefreshTokenAction: thunk(storeActions.createAction({
    request: requestsNames.GET_REFRESH_TOKEN_REQUEST,
    onSuccess: 'setAccessToken',
    action: async (_, { options }, { getStoreActions }) => {
      const response = await apiService.publicAuth.getRefreshToken(options);

      getStoreActions().userStore.setUser({ result: response?.data });

      return response;
    },
  })),

  resetGetRefreshTokenMetadataAction: action(storeActions.onReset(
    requestsNames.GET_REFRESH_TOKEN_REQUEST,
  )),

  onTrigger: action(storeActions.onTrigger()),

  onFetching: action(storeActions.onFetching()),

  onError: action(storeActions.onError()),

  onSuccess: action(storeActions.onSuccess()),

  setAccessToken: action(storeActions.onSuccess((state, { result }) => {
    state.accessToken = result.accessToken;
  })),

  reset: action((state) => {
    state.accessToken = null;
  }),
};
