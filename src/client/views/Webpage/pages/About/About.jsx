import { memo } from 'react';
import { useTranslation } from 'react-i18next';
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

  useHead({
    title: t('head.title.ABOUT_US'),
    description: t('head.description.ABOUT_US'),
  });

  return (
    <WebpageLayerContext>
      <AboutContent />
    </WebpageLayerContext>
  );
});

About.displayName = 'About';

export default About;
