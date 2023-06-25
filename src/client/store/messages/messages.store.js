import { thunk, action } from 'easy-peasy';
import { apiService } from '@client/services/apiService';
import { storeActions } from '@client/utils/storeUtils';

const eventsNames = {
  GET_MESSAGES_EVENT: 'getMessagesEvent',
  CREATE_MESSAGE_EVENT: 'createMessageEvent',
};

export const messagesStore = {
  messages: [],
  events: {},

  getMessagesAction: thunk(storeActions.createAction({
    event: eventsNames.GET_MESSAGES_EVENT,
    onSuccess: 'setMessages',
    action: (_, { options }) => apiService.messages.getMessages(options),
  })),

  createMessageAction: thunk(storeActions.createAction({
    event: eventsNames.CREATE_MESSAGE_EVENT,
    onSuccess: 'updateMessages',
    action: (_, { payload, options }) => apiService.messages.createMessage(payload, options),
  })),

  resetGetMessageMetadataAction: action(storeActions.onReset(eventsNames.GET_MESSAGES_EVENT)),

  resetCreateMessageMetadataAction: action(storeActions.onReset(eventsNames.CREATE_MESSAGE_EVENT)),

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
