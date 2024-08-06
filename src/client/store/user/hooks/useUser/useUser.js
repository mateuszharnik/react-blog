import { useCallback } from 'react';
import { useStoreState, useStoreActions } from 'easy-peasy';
import { createStoreActionsHook } from '@client/utils/storeUtils';
import { requestsNames } from '@client/store/user/user.store';

export const useUser = ({ key } = {}) => {
  const { user, requests } = useStoreState((store) => store.userStore);

  const {
    getMeAction,
    resetGetMeMetadataAction,
  } = useStoreActions((actions) => actions.userStore);

  const useCreateStoreActions = createStoreActionsHook({ requests, key });

  const [
    getMe,
    getMeMetadata,
    cancelGetMe,
    resetGetMeMetadata,
  ] = useCreateStoreActions({
    request: requestsNames.GET_ME_REQUEST,
    action: getMeAction,
    resetMetadataAction: resetGetMeMetadataAction,
  });

  const resetAllMetadata = useCallback(() => {
    resetGetMeMetadata();
  }, []);

  return {
    user,
    actions: {
      getMe,
      cancelGetMe,
    },
    utils: {
      getMeMetadata,
      resetGetMeMetadata,
      resetAllMetadata,
    },
  };
};
