import React, { useEffect, memo } from 'react';
import PageWrapper from '@client/components/PageWrapper';
import { setTitle, setMeta, contactMeta } from '@client/helpers/documentMeta';

const Contact = memo(() => {
  useEffect(() => {
    setTitle('Kontakt');
    setMeta(contactMeta());
  }, []);

  return (
    <PageWrapper>
      Strona kontaktowa
    </PageWrapper>
  );
});

Contact.displayName = 'Contact';

export default Contact;
