import { thunk, action } from 'easy-peasy';
import { apiService } from '@client/services/apiService';
import { storeActions } from '@client/utils/storeUtils';

export const requestsNames = {
  GET_CONTACT_REQUEST: 'getContactRequest',
  UPDATE_CONTACT_REQUEST: 'updateContactRequest',
};

export const contactStore = {
  contact: null,
  requests: {},

  getContactAction: thunk(storeActions.createAction({
    request: requestsNames.GET_CONTACT_REQUEST,
    onSuccess: 'setContact',
    action: (_, { options }) => apiService.publicContact
      .getContact(options),
  })),

  updateContactAction: thunk(storeActions.createAction({
    request: requestsNames.UPDATE_CONTACT_REQUEST,
    onSuccess: 'updateContact',
    action: (_, { payload, options }) => apiService.privateContact
      .updateContact(payload, options),
  })),

  resetGetContactMetadataAction: action(storeActions.onReset(
    requestsNames.GET_CONTACT_REQUEST,
  )),

  resetUpdateContactMetadataAction: action(storeActions.onReset(
    requestsNames.UPDATE_CONTACT_REQUEST,
  )),

  onTrigger: action(storeActions.onTrigger()),

  onFetching: action(storeActions.onFetching()),

  onError: action(storeActions.onError()),

  setContact: action(storeActions.onSuccess((state, { result }) => {
    state.contact = result;
  })),

  updateContact: action(storeActions.onSuccess((state, { result }) => {
    state.contact = result;
  })),

  reset: action((state) => {
    state.contact = null;
  }),
};
