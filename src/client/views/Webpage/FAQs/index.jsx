import React, { useEffect, memo } from 'react';
import { useStoreActions } from 'easy-peasy';
import PageWrapper from '@client/components/PageWrapper';
import { setTitle, setMeta, faqMeta } from '@client/helpers/documentMeta';

const FAQs = memo(() => {
  const { removeLayer } = useStoreActions((actions) => actions.layer);

  useEffect(() => {
    setTitle('Najczęściej zadawane pytania');
    setMeta(faqMeta());

    removeLayer();
  }, []);

  return (
    <PageWrapper>
      Najczęściej zadawane pytania
    </PageWrapper>
  );
});

FAQs.displayName = 'FAQs';

export default FAQs;
