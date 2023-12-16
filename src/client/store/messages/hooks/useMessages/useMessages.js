import { useRef, useCallback, useMemo } from 'react';
import { useStoreState, useStoreActions } from 'easy-peasy';
import { apiService } from '@client/services/apiService';
import { defaultKey, generateEventMetadata } from '@client/utils/storeUtils';

export const useMessages = ({ key = defaultKey } = {}) => {
  const getMessagesCancelToken = useRef(null);
  const createMessageCancelToken = useRef(null);

  const { messages, events } = useStoreState((store) => store.messagesStore);

  const {
    getMessagesAction,
    createMessageAction,
    resetGetMessageMetadataAction,
    resetCreateMessageMetadataAction,
  } = useStoreActions((actions) => actions.messagesStore);

  const getMessagesMetadata = useMemo(() => (
    events?.getMessagesEvent?.[key] || generateEventMetadata()
  ), [events]);

  const createMessageMetadata = useMemo(() => (
    events?.createMessageEvent?.[key] || generateEventMetadata()
  ), [events]);

  const getMessages = useCallback((payload = {}) => {
    const cancelToken = apiService.CancelToken.source();
    const options = { cancelToken: cancelToken.token };

    getMessagesCancelToken.current = cancelToken;
    return getMessagesAction({ key, options, ...payload });
  }, [getMessagesCancelToken]);

  const cancelGetMessages = useCallback((message) => {
    getMessagesCancelToken.current.cancel(message);
  }, [getMessagesCancelToken]);

  const createMessage = useCallback((payload = {}) => {
    const cancelToken = apiService.CancelToken.source();
    const options = { cancelToken: cancelToken.token };

    createMessageCancelToken.current = cancelToken;
    return createMessageAction({ key, options, ...payload });
  }, [createMessageCancelToken]);

  const cancelCreateMessage = useCallback((message) => {
    createMessageCancelToken.current.cancel(message);
  }, [createMessageCancelToken]);

  const resetAllMetadata = useCallback(() => {
    resetGetMessageMetadataAction({ key });
    resetCreateMessageMetadataAction({ key });
  }, []);

  const resetCreateMessageMetadata = useCallback(() => (
    resetCreateMessageMetadataAction({ key })
  ), []);

  const resetGetMessageMetadata = useCallback(() => (
    resetGetMessageMetadataAction({ key })
  ), []);

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
