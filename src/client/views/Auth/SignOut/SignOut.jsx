import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useHead } from '@client/hooks/useHead';
import { lazyLoad } from '@client/utils/lazyLoadUtils';

const SignOutContent = lazyLoad({
  loader: () => import(/* webpackChunkName: 'sign-out' */ '@client/views/Auth/SignOut/content/SignOutContent'),
});

const SignOut = memo(() => {
  const { t } = useTranslation();

  useHead({
    title: t('head.title.SIGN_OUT'),
    description: t('head.description.SIGN_OUT'),
  });

  return (
    <SignOutContent />
  );
});

SignOut.displayName = 'SignOut';

export default SignOut;
