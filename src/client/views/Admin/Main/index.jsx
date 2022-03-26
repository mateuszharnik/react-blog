import React, { memo, useEffect } from 'react';
import { useStoreActions } from 'easy-peasy';
import { Outlet } from 'react-router-dom';
import lazyLoad from '@client/helpers/lazyLoad';

const ToastsContainer = lazyLoad({
  loader: () => import(/* webpackChunkName: 'toasts' */ '@client/components/Toasts/ToastsContainer'),
  loading: null,
  error: null,
});

const Main = memo(() => {
  const { addLayer } = useStoreActions((actions) => actions.layer);

  useEffect(async () => {
    addLayer();
  }, []);

  return (
    <>
      <Outlet />
      <ToastsContainer module="admin" />
    </>
  );
});

Main.displayName = 'Main';

export default Main;
