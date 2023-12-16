import { useRef, useCallback, useMemo } from 'react';
import { useStoreState, useStoreActions } from 'easy-peasy';
import { apiService } from '@client/services/apiService';
import { defaultKey, generateEventMetadata } from '@client/utils/storeUtils';

export const useDocs = ({ key = defaultKey } = {}) => {
  const signInCancelToken = useRef(null);
  const getRefreshTokenCancelToken = useRef(null);

  const { accessToken, events } = useStoreState((store) => store.docsStore);

  const {
    signInAction,
    getRefreshTokenAction,
    resetSignInMetadataAction,
    resetGetRefreshTokenMetadataAction,
  } = useStoreActions((actions) => actions.docsStore);

  const signInMetadata = useMemo(() => (
    events?.signInEvent?.[key] || generateEventMetadata()
  ), [events]);

  const getRefreshTokenMetadata = useMemo(() => (
    events?.getRefreshTokenEvent?.[key] || generateEventMetadata()
  ), [events]);

  const signIn = useCallback((payload = {}) => {
    const cancelToken = apiService.CancelToken.source();
    const options = { cancelToken: cancelToken.token };

    signInCancelToken.current = cancelToken;
    return signInAction({ key, options, ...payload });
  }, [signInCancelToken]);

  const cancelSignIn = useCallback((message) => {
    signInCancelToken.current.cancel(message);
  }, [signInCancelToken]);

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
    resetSignInMetadataAction({ key });
    resetGetRefreshTokenMetadataAction({ key });
  }, []);

  const resetSignInMetadata = useCallback(() => (
    resetSignInMetadataAction({ key })
  ), []);

  const resetGetRefreshTokenMetadata = useCallback(() => (
    resetGetRefreshTokenMetadataAction({ key })
  ), []);

  return {
    accessToken,
    actions: {
      signIn,
      cancelSignIn,
      getRefreshToken,
      cancelGetRefreshToken,
    },
    utils: {
      signInMetadata,
      getRefreshTokenMetadata,
      resetSignInMetadata,
      resetGetRefreshTokenMetadata,
      resetAllMetadata,
    },
  };
};
