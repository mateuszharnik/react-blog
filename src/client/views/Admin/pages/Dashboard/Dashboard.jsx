import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useHead } from '@client/hooks/useHead';
import { lazyLoad } from '@client/utils/lazyLoadUtils';
import AdminLayerContext from '@client/views/Admin/contexts/AdminLayerContext';
import LazyAdminComponentError from '@client/views/Admin/components/LazyLoading/LazyAdminComponentError';
import LazyAdminComponentSpinner from '@client/views/Admin/components/LazyLoading/LazyAdminComponentSpinner';

const DashboardContent = lazyLoad({
  loader: () => import(/* webpackChunkName: 'admin-dashboard' */ '@client/views/Admin/pages/Dashboard/content/DashboardContent'),
  loading: LazyAdminComponentSpinner,
  error: LazyAdminComponentError,
});

const Dashboard = memo(() => {
  const { t } = useTranslation();

  useHead({
    title: t('head.title.ADMIN_DASHBOARD'),
    description: t('head.description.ADMIN_DASHBOARD'),
  });

  return (
    <AdminLayerContext>
      <DashboardContent />
    </AdminLayerContext>
  );
});

Dashboard.displayName = 'Dashboard';

export default Dashboard;
