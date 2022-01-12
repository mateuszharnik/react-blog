import React, { useEffect, memo } from 'react';
import { setTitle } from '@client/helpers/documentMeta';

const FAQs = memo(() => {
  useEffect(() => {
    setTitle('Najczęściej zadawane pytania');
  }, []);

  return (
    <div>
      Najczęściej zadawane pytania
    </div>
  );
});

FAQs.displayName = 'FAQs';

export default FAQs;
