import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useHead } from '@client/hooks/useHead';
import { lazyLoad } from '@client/utils/lazyLoadUtils';
import LazyWebpageComponentError from '@client/views/Webpage/components/LazyLoading/LazyWebpageComponentError';
import LazyWebpageComponentSpinner from '@client/views/Webpage/components/LazyLoading/LazyWebpageComponentSpinner';

const HomeContent = lazyLoad({
  loader: () => import(/* webpackChunkName: 'home' */ '@client/views/Webpage/pages/Home/content/HomeContent'),
  loading: LazyWebpageComponentSpinner,
  error: LazyWebpageComponentError,
});

const Home = memo(() => {
  const { t } = useTranslation();

  useHead({
    title: t('head.title.HOMEPAGE'),
    description: t('head.description.HOMEPAGE'),
  });

  return (
    <HomeContent />
  );
});

Home.displayName = 'Home';

export default Home;
