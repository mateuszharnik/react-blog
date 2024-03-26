import { memo, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useAbout } from '@client/store/about';
import { useHead } from '@client/hooks/useHead';
import { lazyLoad } from '@client/utils/lazyLoadUtils';
import WebpageLayerContext from '@client/views/Webpage/contexts/WebpageLayerContext';
import LazyWebpageComponentError from '@client/views/Webpage/components/LazyLoading/LazyWebpageComponentError';
import LazyWebpageComponentSpinner from '@client/views/Webpage/components/LazyLoading/LazyWebpageComponentSpinner';

const AboutContent = lazyLoad({
  loader: () => import(/* webpackChunkName: 'about' */ '@client/views/Webpage/pages/About/content/AboutContent'),
  loading: LazyWebpageComponentSpinner,
  error: LazyWebpageComponentError,
});

const About = memo(() => {
  const { t } = useTranslation();

  const {
    actions: { getAbout, cancelGetAbout },
    utils: { resetGetAboutMetadata },
  } = useAbout();

  useHead({
    title: t('head.title.ABOUT_US'),
    description: t('head.description.ABOUT_US'),
  });

  useEffect(async () => {
    await getAbout();
  }, []);

  useEffect(() => () => {
    cancelGetAbout();
    resetGetAboutMetadata();
  }, []);

  return (
    <WebpageLayerContext>
      <AboutContent />
    </WebpageLayerContext>
  );
});

About.displayName = 'About';

export default About;
