import React, { memo, useEffect } from 'react';
import { useStoreActions } from 'easy-peasy';
import { Outlet } from 'react-router-dom';

const Main = memo(() => {
  const { addLayer } = useStoreActions((actions) => actions.layer);

  useEffect(async () => {
    addLayer();
  }, []);

  return (
    <>
      <Outlet />
    </>
  );
});

Main.displayName = 'Main';

export default Main;
