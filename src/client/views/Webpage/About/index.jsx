import React, { useEffect, memo } from 'react';
import { useStoreActions } from 'easy-peasy';
import PageWrapper from '@client/components/PageWrapper';
import { setTitle, setMeta, aboutMeta } from '@client/helpers/documentMeta';

const About = memo(() => {
  const { removeLayer } = useStoreActions((actions) => actions.layer);

  useEffect(() => {
    setTitle('O blogu');
    setMeta(aboutMeta());

    removeLayer();
  }, []);

  return (
    <PageWrapper>
      O blogu
    </PageWrapper>
  );
});

About.displayName = 'About';

export default About;
