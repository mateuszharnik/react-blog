import { useRef, useCallback, useMemo } from 'react';
import { useStoreState, useStoreActions } from 'easy-peasy';
import { apiService } from '@client/services/apiService';
import { defaultKey, generateEventMetadata } from '@client/utils/storeUtils';

export const useContact = ({ key = defaultKey } = {}) => {
  const getContactCancelToken = useRef(null);
  const updateContactCancelToken = useRef(null);

  const { contact, events } = useStoreState((store) => store.contactStore);

  const {
    getContactAction,
    updateContactAction,
    resetUpdateContactMetadataAction,
    resetGetContactMetadataAction,
  } = useStoreActions((actions) => actions.contactStore);

  const getContactMetadata = useMemo(() => (
    events?.getContactEvent?.[key] || generateEventMetadata()
  ), [events]);

  const updateContactMetadata = useMemo(() => (
    events?.updateContactEvent?.[key] || generateEventMetadata()
  ), [events]);

  const getContact = useCallback((payload = {}) => {
    const cancelToken = apiService.CancelToken.source();
    const options = { cancelToken: cancelToken.token };

    getContactCancelToken.current = cancelToken;
    return getContactAction({ key, options, ...payload });
  }, [getContactCancelToken]);

  const cancelGetContact = useCallback((message) => {
    getContactCancelToken.current.cancel(message);
  }, [getContactCancelToken]);

  const updateContact = useCallback((payload = {}) => {
    const cancelToken = apiService.CancelToken.source();
    const options = { cancelToken: cancelToken.token };

    updateContactCancelToken.current = cancelToken;
    return updateContactAction({ key, options, ...payload });
  }, [updateContactCancelToken]);

  const cancelUpdateContact = useCallback((message) => {
    updateContactCancelToken.current.cancel(message);
  }, [updateContactCancelToken]);

  const resetAllMetadata = useCallback(() => {
    resetUpdateContactMetadataAction({ key });
    resetGetContactMetadataAction({ key });
  }, []);

  const resetGetContactMetadata = useCallback(() => (
    resetGetContactMetadataAction({ key })
  ), []);

  const resetUpdateContactMetadata = useCallback(() => (
    resetUpdateContactMetadataAction({ key })
  ), []);

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
