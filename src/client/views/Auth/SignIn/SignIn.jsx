import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useHead } from '@client/hooks/useHead';
import { lazyLoad } from '@client/utils/lazyLoadUtils';

const SignInContent = lazyLoad({
  loader: () => import(/* webpackChunkName: 'sign-in' */ '@client/views/Auth/SignIn/content/SignInContent'),
});

const SignIn = memo(() => {
  const { t } = useTranslation();

  useHead({
    title: t('head.title.SIGN_IN'),
    description: t('head.description.SIGN_IN'),
  });

  return (
    <SignInContent />
  );
});

SignIn.displayName = 'SignIn';

export default SignIn;
