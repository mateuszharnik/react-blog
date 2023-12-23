import { useCallback } from 'react';
import { useStoreState, useStoreActions } from 'easy-peasy';
import { createStoreActionsHook } from '@client/utils/storeUtils';
import { requestsNames } from '@client/store/contact/contact.store';

export const useContact = ({ key } = {}) => {
  const { contact, requests } = useStoreState((store) => store.contactStore);

  const {
    getContactAction,
    updateContactAction,
    resetUpdateContactMetadataAction,
    resetGetContactMetadataAction,
  } = useStoreActions((actions) => actions.contactStore);

  const useCreateStoreActions = createStoreActionsHook({ requests, key });

  const [
    getContact,
    getContactMetadata,
    cancelGetContact,
    resetGetContactMetadata,
  ] = useCreateStoreActions({
    request: requestsNames.GET_CONTACT_REQUEST,
    action: getContactAction,
    resetMetadataAction: resetGetContactMetadataAction,
  });

  const [
    updateContact,
    updateContactMetadata,
    cancelUpdateContact,
    resetUpdateContactMetadata,
  ] = useCreateStoreActions({
    request: requestsNames.UPDATE_CONTACT_REQUEST,
    action: updateContactAction,
    resetMetadataAction: resetUpdateContactMetadataAction,
  });

  const resetAllMetadata = useCallback(() => {
    resetGetContactMetadata();
    resetUpdateContactMetadata();
  }, []);

  return {
    contact,
    actions: {
      getContact,
      cancelGetContact,
      updateContact,
      cancelUpdateContact,
    },
    utils: {
      getContactMetadata,
      updateContactMetadata,
      resetGetContactMetadata,
      resetUpdateContactMetadata,
      resetAllMetadata,
    },
  };
};
