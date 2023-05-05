import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useHead } from '@client/hooks/useHead';
import { lazyLoad } from '@client/utils/lazyLoadUtils';

const NotFoundContent = lazyLoad({
  loader: () => import(/* webpackChunkName: 'not-found' */ '@client/views/NotFound/content/NotFoundContent'),
});

const NotFound = memo(() => {
  const { t } = useTranslation();

  useHead({
    title: t('head.title.NOT_FOUND'),
    description: t('head.description.NOT_FOUND'),
  });

  return (
    <NotFoundContent />
  );
});

NotFound.displayName = 'NotFound';

export default NotFound;
