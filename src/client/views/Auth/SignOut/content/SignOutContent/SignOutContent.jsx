import { memo, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useRouter } from '@client/router/hooks';
import { useAuth } from '@client/store/auth';
import { useToastsContext } from '@client/contexts/ToastsContext';
import { useLayerContext } from '@client/contexts/LayerContext';
import { routesConstants, toastsConstants } from '@shared/constants';
import LazyComponentSpinner from '@client/components/LazyLoading/LazyComponentSpinner';

const SignOutContent = memo(() => {
  const { t } = useTranslation();
  const { history: { replace } } = useRouter();
  const { actions: { addToast } } = useToastsContext();
  const { hideLayer } = useLayerContext();

  const {
    actions: { signOut },
    utils: { signOutMetadata, resetSignOutMetadata },
  } = useAuth();

  useEffect(() => {
    if (signOutMetadata.isSuccess) {
      addToast({
        message: signOutMetadata.data?.message,
        type: toastsConstants.TYPE.SUCCESS,
      });

      replace(routesConstants.AUTH.SIGN_IN.ROOT);
    }
  }, [signOutMetadata.isSuccess]);

  useEffect(() => {
    if (signOutMetadata.isError) {
      addToast({
        message: signOutMetadata.error || t('common.errors.ERROR_OCCURRED'),
        type: toastsConstants.TYPE.DANGER,
      });
    }
  }, [signOutMetadata.isError]);

  useEffect(() => {
    if (signOutMetadata.isFinished) {
      hideLayer();
    }
  }, [signOutMetadata.isFinished]);

  useEffect(async () => {
    await signOut();
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
