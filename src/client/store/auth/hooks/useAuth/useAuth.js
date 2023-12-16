import { useRef, useCallback, useMemo } from 'react';
import { useStoreState, useStoreActions } from 'easy-peasy';
import { apiService } from '@client/services/apiService';
import { defaultKey, generateEventMetadata } from '@client/utils/storeUtils';

export const useAuth = ({ key = defaultKey } = {}) => {
  const adminSignInCancelToken = useRef(null);
  const signInCancelToken = useRef(null);
  const signOutCancelToken = useRef(null);
  const signUpCancelToken = useRef(null);

  const { events } = useStoreState((store) => store.authStore);

  const {
    adminSignInAction,
    signInAction,
    signOutAction,
    signUpAction,
    resetAdminSignInMetadataAction,
    resetSignInMetadataAction,
    resetSignUpMetadataAction,
    resetSignOutMetadataAction,
  } = useStoreActions((actions) => actions.authStore);

  const adminSignInMetadata = useMemo(() => (
    events?.adminSignInEvent?.[key] || generateEventMetadata()
  ), [events]);

  const signInMetadata = useMemo(() => (
    events?.signInEvent?.[key] || generateEventMetadata()
  ), [events]);

  const signOutMetadata = useMemo(() => (
    events?.signOutEvent?.[key] || generateEventMetadata()
  ), [events]);

  const signUpMetadata = useMemo(() => (
    events?.signUpEvent?.[key] || generateEventMetadata()
  ), [events]);

  const adminSignIn = useCallback((payload = {}) => {
    const cancelToken = apiService.CancelToken.source();
    const options = { cancelToken: cancelToken.token };

    adminSignInCancelToken.current = cancelToken;
    return adminSignInAction({ key, options, ...payload });
  }, [adminSignInCancelToken]);

  const cancelAdminSignIn = useCallback((message) => {
    adminSignInCancelToken.current.cancel(message);
  }, [adminSignInCancelToken]);

  const signIn = useCallback((payload = {}) => {
    const cancelToken = apiService.CancelToken.source();
    const options = { cancelToken: cancelToken.token };

    signInCancelToken.current = cancelToken;
    return signInAction({ key, options, ...payload });
  }, [signInCancelToken]);

  const cancelSignIn = useCallback((message) => {
    signInCancelToken.current.cancel(message);
  }, [signInCancelToken]);

  const signOut = useCallback((payload = {}) => {
    const cancelToken = apiService.CancelToken.source();
    const options = { cancelToken: cancelToken.token };

    signOutCancelToken.current = cancelToken;
    return signOutAction({ key, options, ...payload });
  }, [signOutCancelToken]);

  const cancelSignOut = useCallback((message) => {
    signOutCancelToken.current.cancel(message);
  }, [signOutCancelToken]);

  const signUp = useCallback((payload = {}) => {
    const cancelToken = apiService.CancelToken.source();
    const options = { cancelToken: cancelToken.token };

    signUpCancelToken.current = cancelToken;
    return signUpAction({ key, options, ...payload });
  }, [signUpCancelToken]);

  const cancelSignUp = useCallback((message) => {
    signUpCancelToken.current.cancel(message);
  }, [signUpCancelToken]);

  const resetAllMetadata = useCallback(() => {
    resetAdminSignInMetadataAction({ key });
    resetSignInMetadataAction({ key });
    resetSignUpMetadataAction({ key });
    resetSignOutMetadataAction({ key });
  }, []);

  const resetAdminSignInMetadata = useCallback(() => (
    resetAdminSignInMetadataAction({ key })
  ), []);

  const resetSignInMetadata = useCallback(() => (
    resetSignInMetadataAction({ key })
  ), []);

  const resetSignUpMetadata = useCallback(() => (
    resetSignUpMetadataAction({ key })
  ), []);

  const resetSignOutMetadata = useCallback(() => (
    resetSignOutMetadataAction({ key })
  ), []);

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
