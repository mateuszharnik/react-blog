import { thunk, action } from 'easy-peasy';
import { apiService } from '@client/services/apiService';
import { storeActions } from '@client/utils/storeUtils';

const eventsNames = {
  GET_ABOUT_EVENT: 'getAboutEvent',
  UPDATE_ABOUT_EVENT: 'updateAboutEvent',
};

export const aboutStore = {
  about: null,
  events: {},

  getAboutAction: thunk(storeActions.createAction({
    event: eventsNames.GET_ABOUT_EVENT,
    onSuccess: 'setAbout',
    action: (_, { options }) => apiService.about.getAbout(options),
  })),

  updateAboutAction: thunk(storeActions.createAction({
    event: eventsNames.UPDATE_ABOUT_EVENT,
    onSuccess: 'updateAbout',
    action: (_, { payload, options }) => apiService.about.updateAbout(payload, options),
  })),

  resetGetAboutMetadataAction: action(storeActions.onReset(eventsNames.GET_ABOUT_EVENT)),

  resetUpdateAboutMetadataAction: action(storeActions.onReset(eventsNames.UPDATE_ABOUT_EVENT)),

  onTrigger: action(storeActions.onTrigger()),

  onFetching: action(storeActions.onFetching()),

  onError: action(storeActions.onError()),

  setAbout: action(storeActions.onSuccess((state, { result }) => {
    state.about = result;
  })),

  updateAbout: action(storeActions.onSuccess((state, { result }) => {
    state.about = result;
  })),
};
