import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useHead } from '@client/hooks/useHead';
import { lazyLoad } from '@client/utils/lazyLoadUtils';
import LazyWebpageComponentError from '@client/views/Webpage/components/LazyLoading/LazyWebpageComponentError';
import LazyWebpageComponentSpinner from '@client/views/Webpage/components/LazyLoading/LazyWebpageComponentSpinner';

const FAQsContent = lazyLoad({
  loader: () => import(/* webpackChunkName: 'faqs' */ '@client/views/Webpage/pages/FAQs/content/FAQsContent'),
  loading: LazyWebpageComponentSpinner,
  error: LazyWebpageComponentError,
});

const FAQs = memo(() => {
  const { t } = useTranslation();

  useHead({
    title: t('head.title.FAQS'),
    description: t('head.description.FAQS'),
  });

  return (
    <FAQsContent />
  );
});

FAQs.displayName = 'FAQs';

export default FAQs;
