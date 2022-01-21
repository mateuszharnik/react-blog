import React, { useEffect, memo } from 'react';
import WelcomeBanner from '@client/components/WelcomeBanner';
import { setTitle, setMeta } from '@client/helpers/documentMeta';

const Home = memo(() => {
  useEffect(() => {
    setTitle('Mateusz Harnik | Blog o kodowaniu');
    setMeta();
  }, []);

  return (
    <div className="home">
      <WelcomeBanner />
      <div className="vh-100" />
      <div className="vh-100" />
      <div className="vh-100" />
    </div>
  );
});

Home.displayName = 'Home';

export default Home;
