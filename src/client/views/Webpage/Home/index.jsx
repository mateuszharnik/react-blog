import React, { useEffect, memo } from 'react';
import { setTitle } from '@client/helpers/documentMeta';

const Home = memo(() => {
  useEffect(() => {
    setTitle('Strona główna');
  }, []);

  return (
    <div>
      Strona główna
    </div>
  );
});

Home.displayName = 'Home';

export default Home;
