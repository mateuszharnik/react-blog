import { memo, useEffect } from 'react';
import { useRouter } from '@client/router/hooks';
import { useAuth } from '@client/store/auth';
import { useLayerContext } from '@client/contexts/LayerContext';
import { routesConstants } from '@shared/constants';
import LazyComponentSpinner from '@client/components/LazyLoading/LazyComponentSpinner';

const SignOutContent = memo(() => {
  const { history: { replace } } = useRouter();
  const { hideLayer } = useLayerContext();

  const {
    actions: { signOut },
    utils: { signOutMetadata, resetSignOutMetadata },
  } = useAuth();

  useEffect(() => {
    if (signOutMetadata.isFinished) {
      hideLayer();
    }
  }, [signOutMetadata.isFinished]);

  useEffect(async () => {
    await signOut({
      onSuccess: () => {
        replace(routesConstants.AUTH.SIGN_IN.ROOT);
      },
    });
  }, []);

  useEffect(() => () => {
    resetSignOutMetadata();
  }, []);

  return (
    <LazyComponentSpinner />
  );
});

SignOutContent.displayName = 'SignOutContent';

export default SignOutContent;
