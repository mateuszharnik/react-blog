import { useCallback } from 'react';
import { useStoreState, useStoreActions } from 'easy-peasy';
import { createStoreActionsHook } from '@client/utils/storeUtils';
import { requestsNames } from '@client/store/tokens/tokens.store';

export const useTokens = ({ key } = {}) => {
  const { accessToken, requests } = useStoreState((store) => store.tokensStore);

  const {
    getRefreshTokenAction,
    getLoggedUserAction,
    revokeRefreshTokenAction,
    resetGetRefreshTokenMetadataAction,
    resetGetLoggedUserMetadataAction,
    resetRevokeRefreshTokenMetadataAction,
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

  const [
    getLoggedUser,
    getLoggedUserMetadata,
    cancelGetLoggedUser,
    resetGetLoggedUserMetadata,
  ] = useCreateStoreActions({
    request: requestsNames.GET_LOGGED_USER_REQUEST,
    action: getLoggedUserAction,
    resetMetadataAction: resetGetLoggedUserMetadataAction,
  });

  const [
    revokeRefreshToken,
    revokeRefreshTokenMetadata,
    cancelRevokeRefreshToken,
    resetRevokeRefreshTokenMetadata,
  ] = useCreateStoreActions({
    request: requestsNames.REVOKE_REFRESH_TOKEN_REQUEST,
    action: revokeRefreshTokenAction,
    resetMetadataAction: resetRevokeRefreshTokenMetadataAction,
  });

  const resetAllMetadata = useCallback(() => {
    resetGetRefreshTokenMetadata();
    resetGetLoggedUserMetadata();
    resetRevokeRefreshTokenMetadata();
  }, []);

  return {
    accessToken,
    actions: {
      getRefreshToken,
      getLoggedUser,
      revokeRefreshToken,
      cancelGetRefreshToken,
      cancelGetLoggedUser,
      cancelRevokeRefreshToken,
    },
    utils: {
      getRefreshTokenMetadata,
      getLoggedUserMetadata,
      revokeRefreshTokenMetadata,
      resetGetRefreshTokenMetadata,
      resetGetLoggedUserMetadata,
      resetRevokeRefreshTokenMetadata,
      resetAllMetadata,
    },
  };
};
