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
      <div className="vh-100" />
      <div className="vh-100" />
      <div className="vh-100" />
    </div>
  );
});

Contact.displayName = 'Contact';

export default Contact;
