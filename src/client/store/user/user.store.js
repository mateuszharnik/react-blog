import { action, computed } from 'easy-peasy';
import { storeActions } from '@client/utils/storeUtils';

export const userStore = {
  user: null,
  events: {},

  permissions: computed((state) => state.user?.role),

  onTrigger: action(storeActions.onTrigger()),

  onFetching: action(storeActions.onFetching()),

  onError: action(storeActions.onError()),

  onSuccess: action(storeActions.onSuccess()),

  setUser: action(storeActions.onSuccess((state, { result }) => {
    state.user = result.user;
  })),
};
