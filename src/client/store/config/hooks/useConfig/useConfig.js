import { useCallback } from 'react';
import { useStoreState, useStoreActions } from 'easy-peasy';
import { createStoreActionsHook } from '@client/utils/storeUtils';
import { requestsNames } from '@client/store/config/config.store';

export const useConfig = ({ key } = {}) => {
  const { config, requests } = useStoreState((store) => store.configStore);

  const {
    getConfigAction,
    updateConfigAction,
    resetUpdateConfigMetadataAction,
    resetGetConfigMetadataAction,
  } = useStoreActions((actions) => actions.configStore);

  const useCreateStoreActions = createStoreActionsHook({ requests, key });

  const [
    getConfig,
    getConfigMetadata,
    cancelGetConfig,
    resetGetConfigMetadata,
  ] = useCreateStoreActions({
    request: requestsNames.GET_CONFIG_REQUEST,
    action: getConfigAction,
    resetMetadataAction: resetGetConfigMetadataAction,
  });

  const [
    updateConfig,
    updateConfigMetadata,
    cancelUpdateConfig,
    resetUpdateConfigMetadata,
  ] = useCreateStoreActions({
    request: requestsNames.UPDATE_CONFIG_REQUEST,
    action: updateConfigAction,
    resetMetadataAction: resetUpdateConfigMetadataAction,
  });

  const resetAllMetadata = useCallback(() => {
    resetGetConfigMetadata();
    resetUpdateConfigMetadata();
  }, []);

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
