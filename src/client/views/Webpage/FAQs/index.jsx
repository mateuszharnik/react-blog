import React, { useEffect, memo } from 'react';
import { setTitle, setMeta, faqMeta } from '@client/helpers/documentMeta';

const FAQs = memo(() => {
  useEffect(() => {
    setTitle('Najczęściej zadawane pytania');
    setMeta(faqMeta());
  }, []);

  return (
    <div>
      Najczęściej zadawane pytania
    </div>
  );
});

FAQs.displayName = 'FAQs';

export default FAQs;
