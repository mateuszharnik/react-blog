import React, { useEffect, memo } from 'react';
import { useStoreActions } from 'easy-peasy';
import PageContainer from '@client/components/PageContainer';
import { setTitle, setMeta, aboutMeta } from '@client/helpers/documentMeta';

const About = memo(() => {
  const { removeLayer } = useStoreActions((actions) => actions.layer);

  useEffect(() => {
    setTitle('O blogu');
    setMeta(aboutMeta());

    removeLayer();
  }, []);

  return (
    <PageContainer>
      O blogu
    </PageContainer>
  );
});

About.displayName = 'About';

export default About;
