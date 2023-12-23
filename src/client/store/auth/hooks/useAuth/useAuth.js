import { useCallback } from 'react';
import { useStoreState, useStoreActions } from 'easy-peasy';
import { createStoreActionsHook } from '@client/utils/storeUtils';
import { requestsNames } from '@client/store/auth/auth.store';

export const useAuth = ({ key } = {}) => {
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
