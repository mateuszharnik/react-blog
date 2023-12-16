import { useRef, useCallback, useMemo } from 'react';
import { useStoreState, useStoreActions } from 'easy-peasy';
import { apiService } from '@client/services/apiService';
import { defaultKey, generateEventMetadata } from '@client/utils/storeUtils';

export const useConfig = ({ key = defaultKey } = {}) => {
  const getConfigCancelToken = useRef(null);
  const updateConfigCancelToken = useRef(null);

  const { config, events } = useStoreState((store) => store.configStore);

  const {
    getConfigAction,
    updateConfigAction,
    resetUpdateConfigMetadataAction,
    resetGetConfigMetadataAction,
  } = useStoreActions((actions) => actions.configStore);

  const getConfigMetadata = useMemo(() => (
    events?.getConfigEvent?.[key] || generateEventMetadata()
  ), [events]);

  const updateConfigMetadata = useMemo(() => (
    events?.updateConfigEvent?.[key] || generateEventMetadata()
  ), [events]);

  const getConfig = useCallback((payload = {}) => {
    const cancelToken = apiService.CancelToken.source();
    const options = { cancelToken: cancelToken.token };

    getConfigCancelToken.current = cancelToken;
    return getConfigAction({ key, options, ...payload });
  }, [getConfigCancelToken]);

  const cancelGetConfig = useCallback((message) => {
    getConfigCancelToken.current.cancel(message);
  }, [getConfigCancelToken]);

  const updateConfig = useCallback((payload = {}) => {
    const cancelToken = apiService.CancelToken.source();
    const options = { cancelToken: cancelToken.token };

    updateConfigCancelToken.current = cancelToken;
    return updateConfigAction({ key, options, ...payload });
  }, [updateConfigCancelToken]);

  const cancelUpdateConfig = useCallback((message) => {
    updateConfigCancelToken.current.cancel(message);
  }, [updateConfigCancelToken]);

  const resetAllMetadata = useCallback(() => {
    resetUpdateConfigMetadataAction({ key });
    resetGetConfigMetadataAction({ key });
  }, []);

  const resetGetConfigMetadata = useCallback(() => (
    resetGetConfigMetadataAction({ key })
  ), []);

  const resetUpdateConfigMetadata = useCallback(() => (
    resetUpdateConfigMetadataAction({ key })
  ), []);

  return {
    config,
    actions: {
      getConfig,
      cancelGetConfig,
      updateConfig,
      cancelUpdateConfig,
    },
    utils: {
      getConfigMetadata,
      updateConfigMetadata,
      resetGetConfigMetadata,
      resetUpdateConfigMetadata,
      resetAllMetadata,
    },
  };
};
