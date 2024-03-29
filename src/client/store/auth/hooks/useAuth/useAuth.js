import { useCallback } from 'react';
import { useStoreState, useStoreActions } from 'easy-peasy';
import { useTranslation } from 'react-i18next';
import { useToastsContext } from '@client/contexts/ToastsContext';
import { createStoreActionsHook } from '@client/utils/storeUtils';
import { requestsNames } from '@client/store/auth/auth.store';
import { toastsConstants } from '@shared/constants';

export const useAuth = ({ key } = {}) => {
  const { t } = useTranslation();
  const { actions: { addToast } } = useToastsContext();

  const { requests } = useStoreState((store) => store.authStore);

  const {
    adminSignInAction,
    signInAction,
    signUpAction,
    signOutAction,
    resetAdminSignInMetadataAction,
    resetSignInMetadataAction,
    resetSignUpMetadataAction,
    resetSignOutMetadataAction,
  } = useStoreActions((actions) => actions.authStore);

  const useCreateStoreActions = createStoreActionsHook({ requests, key });

  const [
    adminSignIn,
    adminSignInMetadata,
    cancelAdminSignIn,
    resetAdminSignInMetadata,
  ] = useCreateStoreActions({
    request: requestsNames.ADMIN_SIGN_IN_REQUEST,
    action: adminSignInAction,
    resetMetadataAction: resetAdminSignInMetadataAction,
    onSuccess: () => {
      addToast({
        message: t('forms.SUCCESSFULLY_LOGGED_IN'),
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

  const [
    signIn,
    signInMetadata,
    cancelSignIn,
    resetSignInMetadata,
  ] = useCreateStoreActions({
    request: requestsNames.SIGN_IN_REQUEST,
    action: signInAction,
    resetMetadataAction: resetSignInMetadataAction,
    onSuccess: () => {
      addToast({
        message: t('forms.SUCCESSFULLY_LOGGED_IN'),
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

  const [
    signUp,
    signUpMetadata,
    cancelSignUp,
    resetSignUpMetadata,
  ] = useCreateStoreActions({
    request: requestsNames.SIGN_UP_REQUEST,
    action: signUpAction,
    resetMetadataAction: resetSignUpMetadataAction,
    onSuccess: () => {
      addToast({
        message: t('forms.SUCCESSFULLY_REGISTERED'),
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

  const [
    signOut,
    signOutMetadata,
    cancelSignOut,
    resetSignOutMetadata,
  ] = useCreateStoreActions({
    request: requestsNames.SIGN_OUT_REQUEST,
    action: signOutAction,
    resetMetadataAction: resetSignOutMetadataAction,
    onSuccess: ({ data }) => {
      addToast({
        message: data?.message,
        type: toastsConstants.TYPE.SUCCESS,
      });
    },
    onError: ({ error }) => {
      addToast({
        message: error || t('common.errors.ERROR_OCCURRED'),
        type: toastsConstants.TYPE.DANGER,
      });
    },
  });

  const resetAllMetadata = useCallback(() => {
    resetAdminSignInMetadata();
    resetSignInMetadata();
    resetSignUpMetadata();
    resetSignOutMetadata();
  }, []);

  return {
    actions: {
      adminSignIn,
      cancelAdminSignIn,
      signIn,
      cancelSignIn,
      signOut,
      cancelSignOut,
      signUp,
      cancelSignUp,
    },
    utils: {
      adminSignInMetadata,
      signInMetadata,
      signOutMetadata,
      signUpMetadata,
      resetAdminSignInMetadata,
      resetSignInMetadata,
      resetSignUpMetadata,
      resetSignOutMetadata,
      resetAllMetadata,
    },
  };
};
