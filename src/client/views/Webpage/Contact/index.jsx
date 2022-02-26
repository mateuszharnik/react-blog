import React, { useEffect, memo } from 'react';
import { useStoreActions } from 'easy-peasy';
import PageContainer from '@client/components/PageContainer';
import { setTitle, setMeta, contactMeta } from '@client/helpers/documentMeta';

const Contact = memo(() => {
  const { removeLayer } = useStoreActions((actions) => actions.layer);

  useEffect(() => {
    setTitle('Kontakt');
    setMeta(contactMeta());

    removeLayer();
  }, []);

  return (
    <PageContainer>
      Strona kontaktowa
    </PageContainer>
  );
});

Contact.displayName = 'Contact';

export default Contact;
