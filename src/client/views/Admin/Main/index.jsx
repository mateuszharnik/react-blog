import React, { memo, useState, useEffect } from 'react';
import { useStoreActions } from 'easy-peasy';
import { Outlet } from 'react-router-dom';
import LazyPageSpinner from '@client/components/LazyLoading/LazyPageSpinner';

const Main = memo(() => {
  const [isLoading, setIsLoading] = useState(true);
  const { addLayer } = useStoreActions((actions) => actions.layer);

  useEffect(async () => {
    addLayer();

    setIsLoading(false);
  }, []);

  return (
    <>
      {isLoading ? <LazyPageSpinner /> : (
        <main>
          <Outlet />
        </main>
      )}
    </>
  );
});

Main.displayName = 'Main';

export default Main;
