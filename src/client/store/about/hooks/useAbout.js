import { useRef, useCallback, useMemo } from 'react';
import { useStoreState, useStoreActions } from 'easy-peasy';
import { apiService } from '@client/services/apiService';
import { defaultKey, generateEventMetadata } from '@client/utils/storeUtils';

export const useAbout = ({ key = defaultKey } = {}) => {
  const getAboutCancelToken = useRef(null);
  const updateAboutCancelToken = useRef(null);

  const { about, events } = useStoreState((store) => store.aboutStore);

  const {
    getAboutAction,
    updateAboutAction,
    resetUpdateAboutMetadataAction,
    resetGetAboutMetadataAction,
  } = useStoreActions((actions) => actions.aboutStore);

  const getAboutMetadata = useMemo(() => (
    events?.getAboutEvent?.[key] || generateEventMetadata()
  ), [events]);

  const updateAboutMetadata = useMemo(() => (
    events?.updateAboutEvent?.[key] || generateEventMetadata()
  ), [events]);

  const getAbout = useCallback((payload = {}) => {
    const cancelToken = apiService.CancelToken.source();
    const options = { cancelToken: cancelToken.token };

    getAboutCancelToken.current = cancelToken;
    return getAboutAction({ key, options, ...payload });
  }, [getAboutCancelToken]);

  const cancelGetAbout = useCallback((message) => {
    getAboutCancelToken.current.cancel(message);
  }, [getAboutCancelToken]);

  const updateAbout = useCallback((payload = {}) => {
    const cancelToken = apiService.CancelToken.source();
    const options = { cancelToken: cancelToken.token };

    updateAboutCancelToken.current = cancelToken;
    return updateAboutAction({ key, options, ...payload });
  }, [updateAboutCancelToken]);

  const cancelUpdateAbout = useCallback((message) => {
    updateAboutCancelToken.current.cancel(message);
  }, [updateAboutCancelToken]);

  const resetAllMetadata = useCallback(() => {
    resetUpdateAboutMetadataAction({ key });
    resetGetAboutMetadataAction({ key });
  }, []);

  const resetGetAboutMetadata = useCallback(() => (
    resetGetAboutMetadataAction({ key })
  ), []);

  const resetUpdateAboutMetadata = useCallback(() => (
    resetUpdateAboutMetadataAction({ key })
  ), []);

  return {
    about,
    actions: {
      getAbout,
      cancelGetAbout,
      updateAbout,
      cancelUpdateAbout,
    },
    utils: {
      getAboutMetadata,
      updateAboutMetadata,
      resetGetAboutMetadata,
      resetUpdateAboutMetadata,
      resetAllMetadata,
    },
  };
};
