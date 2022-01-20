import React, { memo, useRef, useEffect } from 'react';
import { useStoreActions } from 'easy-peasy';
import { Outlet, useLocation } from 'react-router-dom';
import Loadable from 'react-loadable';
import Header from '@client/components/NavBar/Header';

const SkipNavLink = Loadable({
  loader: () => import(/* webpackChunkName: 'skip-nav-link' */ '@client/components/SkipNavLink'),
  loading: () => null,
});

const Main = memo(() => {
  const mainRef = useRef(null);
  const { pathname } = useLocation();
  const { toggleNav } = useStoreActions((actions) => actions.nav);

  // const handleClick = async () => {
  //   try {
  //     const { default: axios } = await import(/* webpackChunkName: 'axios' */ 'axios');

  //     const { data } = await axios('/api');

  //     setMessage(data.message);
  //   } catch (error) {
  //     setMessage('Wystąpił błąd.');
  //   }
  // };

  useEffect(() => () => toggleNav(false), [pathname, toggleNav]);

  return (
    <>
      <SkipNavLink target={mainRef} />
      <Header />
      <main id="tresc" ref={mainRef} className="main">
        <Outlet />
      </main>
    </>
  );
});

Main.displayName = 'Main';

export default Main;
