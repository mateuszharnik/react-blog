import { thunk, action } from 'easy-peasy';
import { apiService } from '@client/services/apiService';
import { storeActions } from '@client/utils/storeUtils';

export const requestsNames = {
  ADMIN_SIGN_IN_REQUEST: 'adminSignInRequest',
  SIGN_IN_REQUEST: 'signInRequest',
  SIGN_OUT_REQUEST: 'signOutRequest',
  SIGN_UP_REQUEST: 'signUpRequest',
};

export const authStore = {
  requests: {},

  adminSignInAction: thunk(storeActions.createAction({
    request: requestsNames.ADMIN_SIGN_IN_REQUEST,
    action: async (_, { payload, options }, { getStoreActions }) => {
      const response = await apiService.publicAuth.signIn(payload, options, true);

      getStoreActions().userStore.setUser({ result: response?.data });
      getStoreActions().tokensStore.setAccessToken({ result: response?.data });

      return response;
    },
  })),

  signInAction: thunk(storeActions.createAction({
    request: requestsNames.SIGN_IN_REQUEST,
    action: async (_, { payload, options }, { getStoreActions }) => {
      const response = await apiService.publicAuth.signIn(payload, options);

      getStoreActions().userStore.setUser({ result: response?.data });
      getStoreActions().tokensStore.setAccessToken({ result: response?.data });

      return response;
    },
  })),

  signUpAction: thunk(storeActions.createAction({
    request: requestsNames.SIGN_UP_REQUEST,
    action: async (_, { payload, options }, { getStoreActions }) => {
      const response = await apiService.publicAuth.signUp(payload, options);

      getStoreActions().userStore.setUser({ result: response?.data });
      getStoreActions().tokensStore.setAccessToken({ result: response?.data });

      return response;
    },
  })),

  signOutAction: thunk(storeActions.createAction({
    request: requestsNames.SIGN_OUT_REQUEST,
    action: async (_, { payload, options }, { getStoreActions }) => {
      const response = await apiService.privateAuth.signOut(payload, options);

      getStoreActions().userStore.reset(null);
      getStoreActions().tokensStore.reset(null);
      getStoreActions().messagesStore.reset(null);

      return response;
    },
  })),

  resetAdminSignInMetadataAction: action(storeActions.onReset(
    requestsNames.ADMIN_SIGN_IN_REQUEST,
  )),

  resetSignInMetadataAction: action(storeActions.onReset(
    requestsNames.SIGN_IN_REQUEST,
  )),

  resetSignUpMetadataAction: action(storeActions.onReset(
    requestsNames.SIGN_UP_REQUEST,
  )),

  resetSignOutMetadataAction: action(storeActions.onReset(
    requestsNames.SIGN_OUT_REQUEST,
  )),

  onTrigger: action(storeActions.onTrigger()),

  onFetching: action(storeActions.onFetching()),

  onError: action(storeActions.onError()),

  onSuccess: action(storeActions.onSuccess()),
};
