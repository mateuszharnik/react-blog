import { useRef, useCallback, useMemo } from 'react';
import { useStoreState, useStoreActions } from 'easy-peasy';
import { apiService } from '@client/services/apiService';
import { defaultKey, generateEventMetadata } from '@client/utils/storeUtils';

export const useCSRF = ({ key = defaultKey } = {}) => {
  const getCSRFTokenCancelToken = useRef(null);

  const { events } = useStoreState((store) => store.csrfStore);

  const {
    getCSRFTokenAction,
    resetGetCSRFTokenMetadataAction,
  } = useStoreActions((actions) => actions.csrfStore);

  const getCSRFTokenMetadata = useMemo(() => (
    events?.getCSRFTokenEvent?.[key] || generateEventMetadata()
  ), [events]);

  const getCSRFToken = useCallback((payload = {}) => {
    const cancelToken = apiService.CancelToken.source();
    const options = { cancelToken: cancelToken.token };

    getCSRFTokenCancelToken.current = cancelToken;
    return getCSRFTokenAction({ key, options, ...payload });
  }, [getCSRFTokenCancelToken]);

  const cancelGetCSRFToken = useCallback((message) => {
    getCSRFTokenCancelToken.current.cancel(message);
  }, [getCSRFTokenCancelToken]);

  const resetAllMetadata = useCallback(() => {
    resetGetCSRFTokenMetadataAction({ key });
  }, []);

  const resetGetCSRFTokenMetadata = useCallback(() => (
    resetGetCSRFTokenMetadataAction({ key })
  ), []);

  return {
    actions: {
      getCSRFToken,
      cancelGetCSRFToken,
    },
    utils: {
      getCSRFTokenMetadata,
      resetGetCSRFTokenMetadata,
      resetAllMetadata,
    },
  };
};
