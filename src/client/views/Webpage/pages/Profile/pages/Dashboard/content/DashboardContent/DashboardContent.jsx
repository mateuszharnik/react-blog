import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import PageContainer from '@client/layouts/PageContainer';

const DashboardContent = memo(() => {
  const { t } = useTranslation();

  return (
    <PageContainer>
      {t('head.title.PROFILE')}
    </PageContainer>
  );
});

DashboardContent.displayName = 'DashboardContent';

export default DashboardContent;
