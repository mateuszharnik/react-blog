import { useCallback } from 'react';
import { useStoreState, useStoreActions } from 'easy-peasy';
import { createStoreActionsHook } from '@client/utils/storeUtils';
import { requestsNames } from '@client/store/about/about.store';

export const useAbout = ({ key } = {}) => {
  const { about, requests } = useStoreState((store) => store.aboutStore);

  const {
    getAboutAction,
    updateAboutAction,
    resetGetAboutMetadataAction,
    resetUpdateAboutMetadataAction,
  } = useStoreActions((actions) => actions.aboutStore);

  const useCreateStoreActions = createStoreActionsHook({ requests, key });

  const [
    getAbout,
    getAboutMetadata,
    cancelGetAbout,
    resetGetAboutMetadata,
  ] = useCreateStoreActions({
    request: requestsNames.GET_ABOUT_REQUEST,
    action: getAboutAction,
    resetMetadataAction: resetGetAboutMetadataAction,
  });

  const [
    updateAbout,
    updateAboutMetadata,
    cancelUpdateAbout,
    resetUpdateAboutMetadata,
  ] = useCreateStoreActions({
    request: requestsNames.UPDATE_ABOUT_REQUEST,
    action: updateAboutAction,
    resetMetadataAction: resetUpdateAboutMetadataAction,
  });

  const resetAllMetadata = useCallback(() => {
    resetGetAboutMetadata();
    resetUpdateAboutMetadata();
  }, []);

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
