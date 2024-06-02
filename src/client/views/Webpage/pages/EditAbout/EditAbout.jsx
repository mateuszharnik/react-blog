import { memo, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useAbout } from '@client/store/about';
import { useHead } from '@client/hooks/useHead';
import { lazyLoad } from '@client/utils/lazyLoadUtils';
import WebpageLayerContext from '@client/views/Webpage/contexts/WebpageLayerContext';
import LazyWebpageComponentError from '@client/views/Webpage/components/LazyLoading/LazyWebpageComponentError';
import LazyWebpageComponentSpinner from '@client/views/Webpage/components/LazyLoading/LazyWebpageComponentSpinner';

const EditAboutContent = lazyLoad({
  loader: () => import(/* webpackChunkName: 'edit-about' */ '@client/views/Webpage/pages/EditAbout/content/EditAboutContent'),
  loading: LazyWebpageComponentSpinner,
  error: LazyWebpageComponentError,
});

const EditAbout = memo(() => {
  const { t } = useTranslation();

  const {
    actions: { getAbout },
    utils: { resetGetAboutMetadata },
  } = useAbout({ key: 'update' });

  useHead({
    title: t('head.title.EDIT_ABOUT_US'),
    description: t('head.description.EDIT_ABOUT_US'),
  });

  useEffect(() => {
    getAbout();
  }, []);

  useEffect(() => () => {
    resetGetAboutMetadata();
  }, []);

  return (
    <WebpageLayerContext>
      <EditAboutContent />
    </WebpageLayerContext>
  );
});

EditAbout.displayName = 'EditAbout';

export default EditAbout;
