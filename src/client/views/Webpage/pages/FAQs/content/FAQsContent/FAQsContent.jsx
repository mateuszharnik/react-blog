import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import PageContainer from '@client/layouts/PageContainer';

const FAQs = memo(() => {
  const { t } = useTranslation();

  return (
    <PageContainer>
      {t('head.title.FAQS')}
    </PageContainer>
  );
});

FAQs.displayName = 'FAQs';

export default FAQs;
