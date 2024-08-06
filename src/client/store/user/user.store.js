import { thunk, action, computed } from 'easy-peasy';
import { apiService } from '@client/services/apiService';
import { storeActions } from '@client/utils/storeUtils';

export const requestsNames = {
  GET_ME_REQUEST: 'getMeRequest',
};

export const userStore = {
  user: null,
  requests: {},

  permissions: computed((state) => state.user?.role),

  getMeAction: thunk(storeActions.createAction({
    request: requestsNames.GET_ME_REQUEST,
    onSuccess: 'setUser',
    action: async (_, { options }) => apiService.privateUsers
      .getMe(options),
  })),

  resetGetMeMetadataAction: action(storeActions.onReset(
    requestsNames.GET_ME_REQUEST,
  )),

  onTrigger: action(storeActions.onTrigger()),

  onFetching: action(storeActions.onFetching()),

  onCanceled: action(storeActions.onCanceled()),

  onError: action(storeActions.onError()),

  onSuccess: action(storeActions.onSuccess()),

  setUser: action(storeActions.onSuccess((state, { result }) => {
    state.user = result;
  })),

  reset: action((state) => {
    state.user = null;
  }),
};
