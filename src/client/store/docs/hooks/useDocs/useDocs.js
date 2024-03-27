import { useCallback } from 'react';
import { useStoreState, useStoreActions } from 'easy-peasy';
import { useToastsContext } from '@client/contexts/ToastsContext';
import { createStoreActionsHook } from '@client/utils/storeUtils';
import { requestsNames } from '@client/store/docs/docs.store';
import { toastsConstants } from '@shared/constants';

export const useDocs = ({ key } = {}) => {
  const { accessToken, requests } = useStoreState((store) => store.docsStore);
  const { actions: { addToast } } = useToastsContext();

  const {
    signInAction,
    getRefreshTokenAction,
    resetSignInMetadataAction,
    resetGetRefreshTokenMetadataAction,
  } = useStoreActions((actions) => actions.docsStore);

  const useCreateStoreActions = createStoreActionsHook({ requests, key });

  const [
    signIn,
    signInMetadata,
    cancelSignIn,
    resetSignInMetadata,
  ] = useCreateStoreActions({
    request: requestsNames.SIGN_IN_REQUEST,
    action: signInAction,
    resetMetadataAction: resetSignInMetadataAction,
    onError: ({ error }) => {
      addToast({
        message: error,
        type: toastsConstants.TYPE.DANGER,
      });
    },
  });

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
    resetSignInMetadata();
    resetGetRefreshTokenMetadata();
  }, []);

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
