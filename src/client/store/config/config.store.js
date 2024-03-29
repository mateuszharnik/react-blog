import { thunk, action } from 'easy-peasy';
import { apiService } from '@client/services/apiService';
import { storeActions } from '@client/utils/storeUtils';

export const requestsNames = {
  GET_CONFIG_REQUEST: 'getConfigRequest',
  UPDATE_CONFIG_REQUEST: 'updateConfigRequest',
};

export const configStore = {
  config: null,
  requests: {},

  getConfigAction: thunk(storeActions.createAction({
    request: requestsNames.GET_CONFIG_REQUEST,
    onSuccess: 'setConfig',
    action: (_, { options }) => apiService.publicConfig
      .getConfig(options),
  })),

  updateConfigAction: thunk(storeActions.createAction({
    request: requestsNames.UPDATE_CONFIG_REQUEST,
    onSuccess: 'updateConfig',
    action: (_, { payload, options }) => apiService.privateConfig
      .updateConfig(payload, options),
  })),

  resetGetConfigMetadataAction: action(storeActions.onReset(
    requestsNames.GET_CONFIG_REQUEST,
  )),

  resetUpdateConfigMetadataAction: action(storeActions.onReset(
    requestsNames.UPDATE_CONFIG_REQUEST,
  )),

  onTrigger: action(storeActions.onTrigger()),

  onFetching: action(storeActions.onFetching()),

  onError: action(storeActions.onError()),

  setConfig: action(storeActions.onSuccess((state, { result }) => {
    state.config = result;
  })),

  updateConfig: action(storeActions.onSuccess((state, { result }) => {
    state.config = result;
  })),

  reset: action((state) => {
    state.config = null;
  }),
};
