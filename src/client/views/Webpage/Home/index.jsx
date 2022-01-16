import React, { useEffect, memo } from 'react';
import { setTitle, setMeta } from '@client/helpers/documentMeta';

const Home = memo(() => {
  useEffect(() => {
    setTitle('Mateusz Harnik | Blog o kodowaniu');
    setMeta();
  }, []);

  return (
    <div>
      Strona główna
    </div>
  );
});

Home.displayName = 'Home';

export default Home;
