import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useHead } from '@client/hooks/useHead';
import { lazyLoad } from '@client/utils/lazyLoadUtils';
import { signOutPropTypes } from '@client/views/Auth/SignOut/propTypes/signOutPropTypes';

const SignOutContent = lazyLoad({
  loader: () => import(/* webpackChunkName: 'sign-out' */ '@client/views/Auth/SignOut/content/SignOutContent'),
});

const SignOut = memo(({ redirectUrl }) => {
  const { t } = useTranslation();

  useHead({
    title: t('head.title.SIGN_OUT'),
    description: t('head.description.SIGN_OUT'),
  });

  return (
    <SignOutContent redirectUrl={redirectUrl} />
  );
});

SignOut.displayName = 'SignOut';

SignOut.propTypes = signOutPropTypes.props;

SignOut.defaultProps = signOutPropTypes.default;

export default SignOut;
