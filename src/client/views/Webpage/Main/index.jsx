import React, {
  memo, useRef, useState, useEffect,
} from 'react';
import { useStoreActions } from 'easy-peasy';
import { Outlet, useLocation } from 'react-router-dom';
import lazyLoad from '@client/helpers/lazyLoad';
import LazyPageSpinner from '@client/components/LazyLoading/LazyPageSpinner';
import PageWrapper from '@client/components/PageWrapper';
import Header from '@client/components/NavBar/Header';
import Footer from '@client/components/Footer';

const SkipNavLink = lazyLoad({
  loader: () => import(/* webpackChunkName: 'skip-nav-link' */ '@client/components/SkipNavLink'),
  loading: null,
  error: null,
});

const ScrollToTopButton = lazyLoad({
  loader: () => import(/* webpackChunkName: 'scroll-to-top-button' */ '@client/components/ScrollToTopButton'),
  loading: null,
  error: null,
});

const Main = memo(() => {
  const [isLoading, setIsLoading] = useState(true);
  const mainRef = useRef(null);
  const { pathname } = useLocation();
  const { toggleNav } = useStoreActions((actions) => actions.nav);
  const { addLayer } = useStoreActions((actions) => actions.layer);
  const { fetchContact } = useStoreActions((actions) => actions.contact);

  useEffect(async () => {
    addLayer();

    await fetchContact();

    setIsLoading(false);
  }, []);

  useEffect(() => () => toggleNav(false), [pathname, toggleNav]);

  return (
    <>
      {isLoading ? <LazyPageSpinner /> : (
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
            <PageWrapper>
              <Outlet />
            </PageWrapper>
          </main>
          <Footer />
          <ScrollToTopButton
            target={mainRef}
          />
        </>
      )}
    </>
  );
});

Main.displayName = 'Main';

export default Main;
