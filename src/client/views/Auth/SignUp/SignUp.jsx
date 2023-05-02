import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useHead } from '@client/hooks/useHead';
import { lazyLoad } from '@client/utils/lazyLoadUtils';

const SignUpContent = lazyLoad({
  loader: () => import(/* webpackChunkName: 'sign-up' */ '@client/views/Auth/SignUp/content/SignUpContent'),
});

const SignUp = memo(() => {
  const { t } = useTranslation();

  useHead({
    title: t('head.title.SIGN_UP'),
    description: t('head.description.SIGN_UP'),
  });

  return (
    <SignUpContent />
  );
});

SignUp.displayName = 'SignUp';

export default SignUp;
