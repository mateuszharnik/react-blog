import React, {
  memo, useRef, useState, useEffect,
} from 'react';
import { useStoreActions, useStoreState } from 'easy-peasy';
import { Outlet, useLocation } from 'react-router-dom';
import LazyPageSpinner from '@client/components/LazyLoading/LazyPageSpinner';
import PageWrapper from '@client/components/Layouts/PageWrapper';
import Header from '@client/components/Header';
import Footer from '@client/components/Footer';
import lazyLoad from '@client/helpers/lazyLoad';

const ToastsContainer = lazyLoad({
  loader: () => import(/* webpackChunkName: 'toasts' */ '@client/components/Toasts/ToastsContainer'),
  loading: null,
  error: null,
});

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
  const { contact } = useStoreState((state) => state.contact);
  const { toggleNav } = useStoreActions((actions) => actions.nav);
  const { addLayer } = useStoreActions((actions) => actions.layer);
  const { fetchContact } = useStoreActions((actions) => actions.contact);

  useEffect(async () => {
    addLayer();

    try {
      if (!contact) {
        await fetchContact();
      }

      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => () => toggleNav(false), [pathname]);

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
      <ToastsContainer module="webpage" />
    </>
  );
});

Main.displayName = 'Main';

export default Main;
