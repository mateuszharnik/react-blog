import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useHead } from '@client/hooks/useHead';
import { lazyLoad } from '@client/utils/lazyLoadUtils';
import LazyWebpageComponentError from '@client/views/Webpage/components/LazyLoading/LazyWebpageComponentError';
import LazyWebpageComponentSpinner from '@client/views/Webpage/components/LazyLoading/LazyWebpageComponentSpinner';

const DashboardContent = lazyLoad({
  loader: () => import(/* webpackChunkName: 'profile-dashboard' */ '@client/views/Webpage/pages/Profile/pages/Dashboard/content/DashboardContent'),
  loading: LazyWebpageComponentSpinner,
  error: LazyWebpageComponentError,
});

const Dashboard = memo(() => {
  const { t } = useTranslation();

  useHead({
    title: t('head.title.PROFILE'),
    description: t('head.description.PROFILE'),
  });

  return (
    <DashboardContent />
  );
});

Dashboard.displayName = 'Dashboard';

export default Dashboard;
