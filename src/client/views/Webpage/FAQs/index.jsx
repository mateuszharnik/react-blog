import React, { useEffect, memo } from 'react';
import { useStoreActions } from 'easy-peasy';
import PageContainer from '@client/components/Layouts/PageContainer';
import { setTitle, setMeta, faqMeta } from '@client/helpers/documentMeta';

const FAQs = memo(() => {
  const { removeLayer } = useStoreActions((actions) => actions.layer);

  useEffect(() => {
    setTitle('Najczęściej zadawane pytania');
    setMeta(faqMeta());

    removeLayer();
  }, []);

  return (
    <PageContainer>
      Najczęściej zadawane pytania
    </PageContainer>
  );
});

FAQs.displayName = 'FAQs';

export default FAQs;
