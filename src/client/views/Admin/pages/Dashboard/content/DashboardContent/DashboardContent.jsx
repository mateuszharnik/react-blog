import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useAdminLayerContext } from '@client/views/Admin/contexts/AdminLayerContext';
import Box from '@client/components/Box';

const DashboardContent = () => {
  const { t } = useTranslation();
  const { hideAdminLayer } = useAdminLayerContext();

  useEffect(() => {
    hideAdminLayer();
  }, []);

  return (
    <Box>
      {t('head.title.ADMIN_DASHBOARD')}
    </Box>
  );
};

DashboardContent.displayName = 'DashboardContent';

export default DashboardContent;
