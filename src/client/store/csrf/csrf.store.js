import { thunk, action } from 'easy-peasy';
import { apiService } from '@client/services/apiService';
import { storeActions } from '@client/utils/storeUtils';

const eventsNames = {
  GET_CSRF_TOKEN_EVENT: 'getCSRFTokenEvent',
};

export const csrfStore = {
  events: {},

  getCSRFTokenAction: thunk(storeActions.createAction({
    event: eventsNames.GET_CSRF_TOKEN_EVENT,
    action: async (_, { options }) => {
      const response = await apiService.csrf.getCSRFToken(options);

      return response;
    },
  })),

  resetGetCSRFTokenMetadataAction: action(storeActions.onReset(eventsNames.GET_CSRF_TOKEN_EVENT)),

  onTrigger: action(storeActions.onTrigger()),

  onFetching: action(storeActions.onFetching()),

  onError: action(storeActions.onError()),

  onSuccess: action(storeActions.onSuccess()),
};
