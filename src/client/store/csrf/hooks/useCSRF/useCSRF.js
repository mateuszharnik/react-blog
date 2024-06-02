import { useCallback } from 'react';
import { useStoreState, useStoreActions } from 'easy-peasy';
import { createStoreActionsHook } from '@client/utils/storeUtils';
import { requestsNames } from '@client/store/csrf/csrf.store';

export const useCSRF = ({ key } = {}) => {
  const { requests } = useStoreState((store) => store.csrfStore);

  const {
    getCSRFTokenAction,
    resetGetCSRFTokenMetadataAction,
  } = useStoreActions((actions) => actions.csrfStore);

  const useCreateStoreActions = createStoreActionsHook({ requests, key });

  const [
    getCSRFToken,
    getCSRFTokenMetadata,
    cancelGetCSRFToken,
    resetGetCSRFTokenMetadata,
  ] = useCreateStoreActions({
    request: requestsNames.GET_CSRF_TOKEN_REQUEST,
    action: getCSRFTokenAction,
    resetMetadataAction: resetGetCSRFTokenMetadataAction,
  });

  const resetAllMetadata = useCallback(() => {
    resetGetCSRFTokenMetadata();
  }, []);

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
