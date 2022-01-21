import React, { useEffect, memo } from 'react';
import { setTitle, setMeta, aboutMeta } from '@client/helpers/documentMeta';

const About = memo(() => {
  useEffect(() => {
    setTitle('O blogu');
    setMeta(aboutMeta());
  }, []);

  return (
    <div>
      O blogu
      <div className="vh-100" />
      <div className="vh-100" />
      <div className="vh-100" />
    </div>
  );
});

About.displayName = 'About';

export default About;
