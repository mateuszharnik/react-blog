import React, { useEffect, memo } from 'react';
import { useStoreActions } from 'easy-peasy';
import WelcomeBanner from '@client/components/WelcomeBanner';
import { setTitle, setMeta } from '@client/helpers/documentMeta';

const Home = memo(() => {
  const { removeLayer } = useStoreActions((actions) => actions.layer);

  useEffect(() => {
    setTitle('Mateusz Harnik | Blog o kodowaniu');
    setMeta();

    removeLayer();
  }, []);

  return (
    <div className="home">
      <WelcomeBanner />
      <div style={{ height: '600px' }} />
    </div>
  );
});

Home.displayName = 'Home';

export default Home;
