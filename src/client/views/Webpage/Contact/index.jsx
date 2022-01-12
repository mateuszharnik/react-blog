import React, { useEffect, memo } from 'react';
import { setTitle } from '@client/helpers/documentMeta';

const Contact = memo(() => {
  useEffect(() => {
    setTitle('Kontakt');
  }, []);

  return (
    <div>
      Strona kontaktowa
    </div>
  );
});

Contact.displayName = 'Contact';

export default Contact;
