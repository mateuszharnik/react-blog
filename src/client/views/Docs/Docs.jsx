import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useHead } from '@client/hooks/useHead';
import { lazyLoad } from '@client/utils/lazyLoadUtils';

const DocsContent = lazyLoad({
  loader: () => import(/* webpackChunkName: 'docs' */ '@client/views/Docs/content/DocsContent'),
});

const Docs = memo(() => {
  const { t } = useTranslation();

  useHead({
    title: t('head.title.DOCUMENTATION'),
    description: t('head.description.DOCUMENTATION'),
  });

  return (
    <DocsContent />
  );
});

Docs.displayName = 'Docs';

export default Docs;
