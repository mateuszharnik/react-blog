import React, { useEffect, memo } from 'react';
import { useStoreActions } from 'easy-peasy';
import PageWrapper from '@client/components/PageWrapper';
import { setTitle, setMeta, contactMeta } from '@client/helpers/documentMeta';

const Contact = memo(() => {
  const { removeLayer } = useStoreActions((actions) => actions.layer);

  useEffect(() => {
    setTitle('Kontakt');
    setMeta(contactMeta());

    removeLayer();
  }, []);

  return (
    <PageWrapper>
      Strona kontaktowa
    </PageWrapper>
  );
});

Contact.displayName = 'Contact';

export default Contact;
