import React, { useEffect, memo } from 'react';
import { setTitle, setMeta, contactMeta } from '@client/helpers/documentMeta';

const Contact = memo(() => {
  useEffect(() => {
    setTitle('Kontakt');
    setMeta(contactMeta());
  }, []);

  return (
    <div>
      Strona kontaktowa
    </div>
  );
});

Contact.displayName = 'Contact';

export default Contact;
