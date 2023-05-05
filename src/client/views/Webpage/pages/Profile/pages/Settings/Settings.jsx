import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useHead } from '@client/hooks/useHead';
import { lazyLoad } from '@client/utils/lazyLoadUtils';
import LazyWebpageComponentError from '@client/views/Webpage/components/LazyLoading/LazyWebpageComponentError';
import LazyWebpageComponentSpinner from '@client/views/Webpage/components/LazyLoading/LazyWebpageComponentSpinner';

const SettingsContent = lazyLoad({
  loader: () => import(/* webpackChunkName: 'settings' */ '@client/views/Webpage/pages/Profile/pages/Settings/content/SettingsContent'),
  loading: LazyWebpageComponentSpinner,
  error: LazyWebpageComponentError,
});

const Settings = memo(() => {
  const { t } = useTranslation();

  useHead({
    title: t('head.title.SETTINGS'),
    description: t('head.description.SETTINGS'),
  });

  return (
    <SettingsContent />
  );
});

Settings.displayName = 'Settings';

export default Settings;
