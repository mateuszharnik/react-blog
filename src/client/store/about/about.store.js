import { thunk, action } from 'easy-peasy';
import { apiService } from '@client/services/apiService';
import { storeActions } from '@client/utils/storeUtils';

export const requestsNames = {
  GET_ABOUT_REQUEST: 'getAboutRequest',
  UPDATE_ABOUT_REQUEST: 'updateAboutRequest',
};

export const aboutStore = {
  about: null,
  requests: {},

  getAboutAction: thunk(storeActions.createAction({
    request: requestsNames.GET_ABOUT_REQUEST,
    onSuccess: 'setAbout',
    action: (_, { options }) => apiService.publicAbout
      .getAbout(options),
  })),

  updateAboutAction: thunk(storeActions.createAction({
    request: requestsNames.UPDATE_ABOUT_REQUEST,
    onSuccess: 'updateAbout',
    action: (_, { payload, options }) => apiService.privateAbout
      .updateAbout(payload, options),
  })),

  resetGetAboutMetadataAction: action(storeActions.onReset(
    requestsNames.GET_ABOUT_REQUEST,
  )),

  resetUpdateAboutMetadataAction: action(storeActions.onReset(
    requestsNames.UPDATE_ABOUT_REQUEST,
  )),

  onTrigger: action(storeActions.onTrigger()),

  onFetching: action(storeActions.onFetching()),

  onError: action(storeActions.onError()),

  setAbout: action(storeActions.onSuccess((state, { result }) => {
    state.about = result;
  })),

  updateAbout: action(storeActions.onSuccess((state, { result }) => {
    state.about = result;
  })),

  reset: action((state) => {
    state.about = null;
  }),
};
