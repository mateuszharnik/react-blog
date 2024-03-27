import { useMemo, useCallback } from 'react';
import { useStoreState, useStoreActions } from 'easy-peasy';
import { useTranslation } from 'react-i18next';
import { useToastsContext } from '@client/contexts/ToastsContext';
import { createStoreActionsHook } from '@client/utils/storeUtils';
import { requestsNames } from '@client/store/messages/messages.store';
import { toastsConstants } from '@shared/constants';

export const useMessages = ({ key } = {}) => {
  const { ids, entities, requests } = useStoreState((store) => store.messagesStore);
  const { t } = useTranslation();
  const { actions: { addToast } } = useToastsContext();

  const messages = useMemo(() => ids.map((id) => entities[id]), [ids, entities]);

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
    onError: ({ error }) => {
      addToast({
        message: error,
        type: toastsConstants.TYPE.DANGER,
      });
    },
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
    onSuccess: () => {
      addToast({
        message: t('forms.SUCCESSFULLY_SENT'),
        type: toastsConstants.TYPE.SUCCESS,
      });
    },
    onError: ({ error }) => {
      addToast({
        message: error,
        type: toastsConstants.TYPE.DANGER,
      });
    },
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
