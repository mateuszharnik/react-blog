import { thunk, action } from 'easy-peasy';
import { apiService } from '@client/services/apiService';
import { storeActions } from '@client/utils/storeUtils';

const eventsNames = {
  ADMIN_SIGN_IN_EVENT: 'adminSignInEvent',
  SIGN_IN_EVENT: 'signInEvent',
  SIGN_OUT_EVENT: 'signOutEvent',
  SIGN_UP_EVENT: 'signUpEvent',
};

export const authStore = {
  events: {},

  adminSignInAction: thunk(storeActions.createAction({
    event: eventsNames.ADMIN_SIGN_IN_EVENT,
    action: async (_, { payload, options }, { getStoreActions }) => {
      const response = await apiService.auth.signIn(payload, options, true);

      getStoreActions().userStore.setUser({ result: response?.data });
      getStoreActions().tokensStore.setAccessToken({ result: response?.data });

      return response;
    },
  })),

  signInAction: thunk(storeActions.createAction({
    event: eventsNames.SIGN_IN_EVENT,
    action: async (_, { payload, options }, { getStoreActions }) => {
      const response = await apiService.auth.signIn(payload, options);

      getStoreActions().userStore.setUser({ result: response?.data });
      getStoreActions().tokensStore.setAccessToken({ result: response?.data });

      return response;
    },
  })),

  signUpAction: thunk(storeActions.createAction({
    event: eventsNames.SIGN_UP_EVENT,
    action: async (_, { payload, options }, { getStoreActions }) => {
      const response = await apiService.auth.signUp(payload, options);

      getStoreActions().userStore.setUser({ result: response?.data });
      getStoreActions().tokensStore.setAccessToken({ result: response?.data });

      return response;
    },
  })),

  signOutAction: thunk(storeActions.createAction({
    event: eventsNames.SIGN_OUT_EVENT,
    action: async (_, { payload, options }, { getStoreActions }) => {
      const response = await apiService.auth.signOut(payload, options);

      getStoreActions().userStore.setUser({ result: { user: null } });
      getStoreActions().tokensStore.setAccessToken({ result: { accessToken: '' } });

      return response;
    },
  })),

  resetAdminSignInMetadataAction: action(storeActions.onReset(eventsNames.ADMIN_SIGN_IN_EVENT)),

  resetSignInMetadataAction: action(storeActions.onReset(eventsNames.SIGN_IN_EVENT)),

  resetSignUpMetadataAction: action(storeActions.onReset(eventsNames.SIGN_UP_EVENT)),

  resetSignOutMetadataAction: action(storeActions.onReset(eventsNames.SIGN_OUT_EVENT)),

  onTrigger: action(storeActions.onTrigger()),

  onFetching: action(storeActions.onFetching()),

  onError: action(storeActions.onError()),

  onSuccess: action(storeActions.onSuccess()),
};
