import { memo, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useAdminLayerContext } from '@client/views/Admin/context/AdminLayerContext';

const DashboardContent = memo(() => {
  const { t } = useTranslation();
  const { hideAdminLayer } = useAdminLayerContext();

  useEffect(() => {
    hideAdminLayer();
  }, []);

  return (
    <div>
      {t('head.title.ADMIN_DASHBOARD')}
    </div>
  );
});

DashboardContent.displayName = 'DashboardContent';

export default DashboardContent;
