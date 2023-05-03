import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import PageContainer from '@client/layouts/PageContainer';

const SettingsContent = memo(() => {
  const { t } = useTranslation();

  return (
    <PageContainer>
      {t('head.title.SETTINGS')}
    </PageContainer>
  );
});

SettingsContent.displayName = 'SettingsContent';

export default SettingsContent;
