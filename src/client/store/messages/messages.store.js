import orderBy from 'lodash/orderBy';
import { thunk, action } from 'easy-peasy';
import { apiService } from '@client/services/apiService';
import { storeActions, createEntityAdapter } from '@client/utils/storeUtils';

export const requestsNames = {
  GET_MESSAGES_REQUEST: 'getMessagesRequest',
  CREATE_MESSAGE_REQUEST: 'createMessageRequest',
};

const messagesAdapter = createEntityAdapter({
  sort: (data) => orderBy(data, 'first_name', 'asc'),
  initialState: {
    ids: [],
    entities: {},
    requests: {},
  },
});

export const messagesStore = {
  ...messagesAdapter.getInitialState(),

  getMessagesAction: thunk(storeActions.createAction({
    request: requestsNames.GET_MESSAGES_REQUEST,
    onSuccess: 'onSuccessGetMessages',
    action: (_, { options }) => apiService.privateMessages
      .getMessages(options),
  })),

  createMessageAction: thunk(storeActions.createAction({
    request: requestsNames.CREATE_MESSAGE_REQUEST,
    onSuccess: 'onSuccessCreateMessage',
    action: (_, { payload, options }) => apiService.publicMessages
      .createMessage(payload, options),
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

  onSuccessGetMessages: action(storeActions.onSuccess((state, { result }) => {
    messagesAdapter.setAll(state, result);
  })),

  onSuccessCreateMessage: action(storeActions.onSuccess((state, { result }) => {
    messagesAdapter.addOne(state, result);
  })),

  reset: action((state) => {
    const { ids, entities } = messagesAdapter.getInitialState();

    state.ids = ids;
    state.entities = entities;
  }),
};
