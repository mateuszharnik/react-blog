import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useHead } from '@client/hooks/useHead';
import { lazyLoad } from '@client/utils/lazyLoadUtils';

const AdminSignInContent = lazyLoad({
  loader: () => import(/* webpackChunkName: 'admin-sign-in' */ '@client/views/Auth/AdminSignIn/content/AdminSignInContent'),
});

const AdminSignIn = memo(() => {
  const { t } = useTranslation();

  useHead({
    title: t('head.title.ADMIN_SIGN_IN'),
    description: t('head.description.ADMIN_SIGN_IN'),
  });

  return (
    <AdminSignInContent />
  );
});

AdminSignIn.displayName = 'AdminSignIn';

export default AdminSignIn;
