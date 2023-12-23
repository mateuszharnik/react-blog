import { useCallback } from 'react';
import { useStoreState, useStoreActions } from 'easy-peasy';
import { createStoreActionsHook } from '@client/utils/storeUtils';
import { requestsNames } from '@client/store/tokens/tokens.store';

export const useTokens = ({ key } = {}) => {
  const { accessToken, requests } = useStoreState((store) => store.tokensStore);

  const {
    getRefreshTokenAction,
    resetGetRefreshTokenMetadataAction,
  } = useStoreActions((actions) => actions.tokensStore);

  const useCreateStoreActions = createStoreActionsHook({ requests, key });

  const [
    getRefreshToken,
    getRefreshTokenMetadata,
    cancelGetRefreshToken,
    resetGetRefreshTokenMetadata,
  ] = useCreateStoreActions({
    request: requestsNames.GET_REFRESH_TOKEN_REQUEST,
    action: getRefreshTokenAction,
    resetMetadataAction: resetGetRefreshTokenMetadataAction,
  });

  const resetAllMetadata = useCallback(() => {
    resetGetRefreshTokenMetadata();
  }, []);

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
