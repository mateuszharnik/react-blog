import React, { useEffect, memo } from 'react';
import PageWrapper from '@client/components/PageWrapper';
import { setTitle, setMeta, aboutMeta } from '@client/helpers/documentMeta';

const About = memo(() => {
  useEffect(() => {
    setTitle('O blogu');
    setMeta(aboutMeta());
  }, []);

  return (
    <PageWrapper>
      O blogu
    </PageWrapper>
  );
});

About.displayName = 'About';

export default About;
