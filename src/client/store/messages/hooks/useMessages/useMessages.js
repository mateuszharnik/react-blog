import { useCallback } from 'react';
import { useStoreState, useStoreActions } from 'easy-peasy';
import { createStoreActionsHook } from '@client/utils/storeUtils';
import { requestsNames } from '@client/store/messages/messages.store';

export const useMessages = ({ key } = {}) => {
  const { messages, requests } = useStoreState((store) => store.messagesStore);

  const {
    getMessagesAction,
    createMessageAction,
    resetGetMessageMetadataAction,
    resetCreateMessageMetadataAction,
  } = useStoreActions((actions) => actions.messagesStore);

  const useCreateStoreActions = createStoreActionsHook({ requests, key });

  const [
    getMessages,
    getMessagesMetadata,
    cancelGetMessages,
    resetGetMessageMetadata,
  ] = useCreateStoreActions({
    request: requestsNames.GET_MESSAGES_REQUEST,
    action: getMessagesAction,
    resetMetadataAction: resetGetMessageMetadataAction,
  });

  const [
    createMessage,
    createMessageMetadata,
    cancelCreateMessage,
    resetCreateMessageMetadata,
  ] = useCreateStoreActions({
    request: requestsNames.CREATE_MESSAGE_REQUEST,
    action: createMessageAction,
    resetMetadataAction: resetCreateMessageMetadataAction,
  });

  const resetAllMetadata = useCallback(() => {
    resetGetMessageMetadata();
    resetCreateMessageMetadata();
  }, []);

  return {
    messages,
    actions: {
      getMessages,
      cancelGetMessages,
      createMessage,
      cancelCreateMessage,
    },
    utils: {
      getMessagesMetadata,
      createMessageMetadata,
      resetGetMessageMetadata,
      resetCreateMessageMetadata,
      resetAllMetadata,
    },
  };
};
