import { thunk, action } from 'easy-peasy';
import { apiService } from '@client/services/apiService';
import { storeActions } from '@client/utils/storeUtils';

export const requestsNames = {
  GET_MESSAGES_REQUEST: 'getMessagesRequest',
  CREATE_MESSAGE_REQUEST: 'createMessageRequest',
};

export const messagesStore = {
  messages: [],
  requests: {},

  getMessagesAction: thunk(storeActions.createAction({
    request: requestsNames.GET_MESSAGES_REQUEST,
    onSuccess: 'setMessages',
    action: (_, { options }) => apiService.messages.getMessages(options),
  })),

  createMessageAction: thunk(storeActions.createAction({
    request: requestsNames.CREATE_MESSAGE_REQUEST,
    onSuccess: 'updateMessages',
    action: (_, { payload, options }) => apiService.messages.createMessage(payload, options),
  })),

  resetGetMessageMetadataAction: action(storeActions.onReset(
    requestsNames.GET_MESSAGES_REQUEST,
  )),

  resetCreateMessageMetadataAction: action(storeActions.onReset(
    requestsNames.CREATE_MESSAGE_REQUEST,
  )),

  onTrigger: action(storeActions.onTrigger()),

  onFetching: action(storeActions.onFetching()),

  onError: action(storeActions.onError()),

  setMessages: action(storeActions.onSuccess((state, { result }) => {
    state.messages = result;
  })),

  updateMessages: action(storeActions.onSuccess((state, { result }) => {
    state.messages = [result, ...state.messages];
  })),
};
