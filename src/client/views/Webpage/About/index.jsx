import React, { useEffect, memo } from 'react';
import { setTitle, setMeta, aboutMeta } from '@client/helpers/documentMeta';

const About = memo(() => {
  useEffect(() => {
    setTitle('O blogu');
    setMeta(aboutMeta());
  }, []);

  return (
    <div>
      O nas
    </div>
  );
});

About.displayName = 'About';

export default About;
