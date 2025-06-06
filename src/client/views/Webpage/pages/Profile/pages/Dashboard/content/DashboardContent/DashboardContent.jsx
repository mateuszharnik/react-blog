import { useTranslation } from 'react-i18next';
import PageContainer from '@client/layouts/PageContainer';

const DashboardContent = () => {
  const { t } = useTranslation();

  return (
    <PageContainer>
      {t('head.title.PROFILE')}
    </PageContainer>
  );
};

DashboardContent.displayName = 'DashboardContent';

export default DashboardContent;
