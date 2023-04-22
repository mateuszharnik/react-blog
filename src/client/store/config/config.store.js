import { thunk, action } from 'easy-peasy';
import { apiService } from '@client/services/apiService';
import { storeActions } from '@client/utils/storeUtils';

const eventsNames = {
  GET_CONFIG_EVENT: 'getConfigEvent',
  UPDATE_CONFIG_EVENT: 'updateConfigEvent',
};

export const configStore = {
  config: null,
  events: {},

  getConfigAction: thunk(storeActions.createAction({
    event: eventsNames.GET_CONFIG_EVENT,
    onSuccess: 'setConfig',
    action: (_, { options }) => apiService.config.getConfig(options),
  })),

  updateConfigAction: thunk(storeActions.createAction({
    event: eventsNames.UPDATE_CONFIG_EVENT,
    onSuccess: 'updateConfig',
    action: (_, { payload, options }) => apiService.config.updateConfig(payload, options),
  })),

  resetGetConfigMetadataAction: action(storeActions.onReset(eventsNames.GET_CONFIG_EVENT)),

  resetUpdateConfigMetadataAction: action(storeActions.onReset(eventsNames.UPDATE_CONFIG_EVENT)),

  onTrigger: action(storeActions.onTrigger()),

  onFetching: action(storeActions.onFetching()),

  onError: action(storeActions.onError()),

  setConfig: action(storeActions.onSuccess((state, { result }) => {
    state.config = result;
  })),

  updateConfig: action(storeActions.onSuccess((state, { result }) => {
    state.config = result;
  })),
};
