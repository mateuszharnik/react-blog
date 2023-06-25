import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import PageContainer from '@client/layouts/PageContainer';

const ContactContent = memo(() => {
  const { t } = useTranslation();

  return (
    <PageContainer>
      {t('head.title.CONTACT')}
    </PageContainer>
  );
});

ContactContent.displayName = 'ContactContent';

export default ContactContent;
