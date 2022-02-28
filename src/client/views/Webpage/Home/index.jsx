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
    <>
      <WelcomeBanner />
      <div className="home container-fluid px-4">
        <div className="py-5" />
      </div>
    </>
  );
});

Home.displayName = 'Home';

export default Home;
