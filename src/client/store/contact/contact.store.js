import { thunk, action } from 'easy-peasy';
import { apiService } from '@client/services/apiService';
import { storeActions } from '@client/utils/storeUtils';

const eventsNames = {
  GET_CONTACT_EVENT: 'getContactEvent',
  UPDATE_CONTACT_EVENT: 'updateContactEvent',
};

export const contactStore = {
  contact: null,
  events: {},

  getContactAction: thunk(storeActions.createAction({
    event: eventsNames.GET_CONTACT_EVENT,
    onSuccess: 'setContact',
    action: (_, { options }) => apiService.contact.getContact(options),
  })),

  updateContactAction: thunk(storeActions.createAction({
    event: eventsNames.UPDATE_CONTACT_EVENT,
    onSuccess: 'updateContact',
    action: (_, { payload, options }) => apiService.contact.updateContact(payload, options),
  })),

  resetGetContactMetadataAction: action(storeActions.onReset(eventsNames.GET_CONTACT_EVENT)),

  resetUpdateContactMetadataAction: action(storeActions.onReset(eventsNames.UPDATE_CONTACT_EVENT)),

  onTrigger: action(storeActions.onTrigger()),

  onFetching: action(storeActions.onFetching()),

  onError: action(storeActions.onError()),

  setContact: action(storeActions.onSuccess((state, { result }) => {
    state.contact = result;
  })),

  updateContact: action(storeActions.onSuccess((state, { result }) => {
    state.contact = result;
  })),
};
