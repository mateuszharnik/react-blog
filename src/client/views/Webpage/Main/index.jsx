import React, { memo, useRef, useEffect } from 'react';
import { useStoreActions } from 'easy-peasy';
import { Outlet, useLocation } from 'react-router-dom';
import lazyLoad from '@client/helpers/lazyLoad';
import Header from '@client/components/NavBar/Header';

const SkipNavLink = lazyLoad({
  loader: () => import(/* webpackChunkName: 'skip-nav-link' */ '@client/components/SkipNavLink'),
  loading: () => null,
});

const ScrollToTopButton = lazyLoad({
  loader: () => import(/* webpackChunkName: 'scroll-to-top-button' */ '@client/components/ScrollToTopButton'),
  loading: () => null,
});

const Main = memo(() => {
  const mainRef = useRef(null);
  const { pathname } = useLocation();
  const { toggleNav } = useStoreActions((actions) => actions.nav);

  useEffect(() => () => toggleNav(false), [pathname, toggleNav]);

  return (
    <>
      <SkipNavLink
        target={mainRef}
      />
      <Header />
      <main
        id="tresc"
        ref={mainRef}
        className="main"
      >
        <Outlet />
      </main>
      <ScrollToTopButton
        target={mainRef}
      />
    </>
  );
});

Main.displayName = 'Main';

export default Main;
