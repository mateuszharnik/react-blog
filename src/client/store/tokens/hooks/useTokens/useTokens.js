import { useRef, useCallback, useMemo } from 'react';
import { useStoreState, useStoreActions } from 'easy-peasy';
import { apiService } from '@client/services/apiService';
import { defaultKey, generateEventMetadata } from '@client/utils/storeUtils';

export const useTokens = ({ key = defaultKey } = {}) => {
  const getRefreshTokenCancelToken = useRef(null);

  const { accessToken, events } = useStoreState((store) => store.tokensStore);

  const {
    getRefreshTokenAction,
    resetGetRefreshTokenMetadataAction,
  } = useStoreActions((actions) => actions.tokensStore);

  const getRefreshTokenMetadata = useMemo(() => (
    events?.getRefreshTokenEvent?.[key] || generateEventMetadata()
  ), [events]);

  const getRefreshToken = useCallback((payload = {}) => {
    const cancelToken = apiService.CancelToken.source();
    const options = { cancelToken: cancelToken.token };

    getRefreshTokenCancelToken.current = cancelToken;
    return getRefreshTokenAction({ key, options, ...payload });
  }, [getRefreshTokenCancelToken]);

  const cancelGetRefreshToken = useCallback((message) => {
    getRefreshTokenCancelToken.current.cancel(message);
  }, [getRefreshTokenCancelToken]);

  const resetAllMetadata = useCallback(() => {
    resetGetRefreshTokenMetadataAction({ key });
  }, []);

  const resetGetRefreshTokenMetadata = useCallback(() => (
    resetGetRefreshTokenMetadataAction({ key })
  ), []);

  return {
    accessToken,
    actions: {
      getRefreshToken,
      cancelGetRefreshToken,
    },
    utils: {
      getRefreshTokenMetadata,
      resetGetRefreshTokenMetadata,
      resetAllMetadata,
    },
  };
};
