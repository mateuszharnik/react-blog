import React, { useEffect, memo } from 'react';
import PageWrapper from '@client/components/PageWrapper';
import { setTitle, setMeta, faqMeta } from '@client/helpers/documentMeta';

const FAQs = memo(() => {
  useEffect(() => {
    setTitle('Najczęściej zadawane pytania');
    setMeta(faqMeta());
  }, []);

  return (
    <PageWrapper>
      Najczęściej zadawane pytania
    </PageWrapper>
  );
});

FAQs.displayName = 'FAQs';

export default FAQs;
