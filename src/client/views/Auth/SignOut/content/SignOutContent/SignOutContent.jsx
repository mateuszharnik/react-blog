import { memo, useEffect } from 'react';
import { useRouter } from '@client/router/hooks';
import { useAuth } from '@client/store/auth';
import { useLayerContext } from '@client/contexts/LayerContext';
import { signOutPropTypes } from '@client/views/Auth/SignOut/propTypes/signOutPropTypes';
import LazyComponentSpinner from '@client/components/LazyLoading/LazyComponentSpinner';

const SignOutContent = memo(({ redirectUrl }) => {
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

  useEffect(() => {
    signOut({
      onSuccess: () => {
        replace(redirectUrl);
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

SignOutContent.propTypes = signOutPropTypes.props;

SignOutContent.defaultProps = signOutPropTypes.default;

export default SignOutContent;
