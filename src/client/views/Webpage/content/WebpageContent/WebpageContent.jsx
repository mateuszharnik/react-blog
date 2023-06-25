import { memo, useRef, useEffect } from 'react';
import { useLayerContext } from '@client/context/LayerContext';
import { lazyLoad } from '@client/utils/lazyLoadUtils';
import View from '@client/router/components/View';
import PageWrapper from '@client/layouts/PageWrapper';
import Header from '@client/views/Webpage/components/Header';
import Footer from '@client/views/Webpage/components/Footer';

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

const WebpageContent = memo(() => {
  const mainRef = useRef(null);

  const { hideLayer } = useLayerContext();

  useEffect(() => {
    hideLayer();
  }, []);

  return (
    <>
      <SkipNavLink target={mainRef} />
      <Header />
      <main
        id="main"
        ref={mainRef}
        className="main"
      >
        <PageWrapper>
          <View />
        </PageWrapper>
      </main>
      <Footer />
      <ScrollToTopButton target={mainRef} />
    </>
  );
});

WebpageContent.displayName = 'WebpageContent';

export default WebpageContent;
