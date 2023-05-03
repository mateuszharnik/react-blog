import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useHead } from '@client/hooks/useHead';
import { lazyLoad } from '@client/utils/lazyLoadUtils';
import LazyWebpageComponentError from '@client/views/Webpage/components/LazyLoading/LazyWebpageComponentError';
import LazyWebpageComponentSpinner from '@client/views/Webpage/components/LazyLoading/LazyWebpageComponentSpinner';

const ContactContent = lazyLoad({
  loader: () => import(/* webpackChunkName: 'contact' */ '@client/views/Webpage/pages/Contact/content/ContactContent'),
  loading: LazyWebpageComponentSpinner,
  error: LazyWebpageComponentError,
});

const Contact = memo(() => {
  const { t } = useTranslation();

  useHead({
    title: t('head.title.CONTACT'),
    description: t('head.description.CONTACT'),
  });

  return (
    <ContactContent />
  );
});

Contact.displayName = 'Contact';

export default Contact;
