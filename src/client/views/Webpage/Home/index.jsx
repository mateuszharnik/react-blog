import React, { useEffect, memo } from 'react';
import { useStoreActions } from 'easy-peasy';
import WelcomeBanner from '@client/components/WelcomeBanner';
import PageContainer from '@client/components/PageContainer';
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
      <PageContainer>
        <div className="home">
          <div className="py-5" />
        </div>
      </PageContainer>
    </>
  );
});

Home.displayName = 'Home';

export default Home;
