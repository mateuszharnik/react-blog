import React, { useEffect, memo } from 'react';
import { setTitle } from '@client/helpers/documentMeta';

const About = memo(() => {
  useEffect(() => {
    setTitle('O nas');
  }, []);

  return (
    <div>
      O nas
    </div>
  );
});

export default About;
