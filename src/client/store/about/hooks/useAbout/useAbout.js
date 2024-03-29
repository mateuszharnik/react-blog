import { useCallback } from 'react';
import { useStoreState, useStoreActions } from 'easy-peasy';
import { useTranslation } from 'react-i18next';
import { useToastsContext } from '@client/contexts/ToastsContext';
import { createStoreActionsHook } from '@client/utils/storeUtils';
import { requestsNames } from '@client/store/about/about.store';
import { toastsConstants } from '@shared/constants';

export const useAbout = ({ key } = {}) => {
  const { t } = useTranslation();
  const { actions: { addToast } } = useToastsContext();

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
    onError: ({ error }) => {
      if (error === 'canceled') return;

      addToast({
        message: error,
        type: toastsConstants.TYPE.DANGER,
      });
    },
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
    onSuccess: () => {
      addToast({
        message: t('forms.SUCCESSFULLY_SAVED'),
        type: toastsConstants.TYPE.SUCCESS,
      });
    },
    onError: ({ error }) => {
      addToast({
        message: error,
        type: toastsConstants.TYPE.DANGER,
      });
    },
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
