import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useHead } from '@client/hooks/useHead';
import { lazyLoad } from '@client/utils/lazyLoadUtils';
import LazyWebpageComponentError from '@client/views/Webpage/components/LazyLoading/LazyWebpageComponentError';
import LazyWebpageComponentSpinner from '@client/views/Webpage/components/LazyLoading/LazyWebpageComponentSpinner';

const PostsContent = lazyLoad({
  loader: () => import(/* webpackChunkName: 'posts' */ '@client/views/Webpage/pages/Posts/content/PostsContent'),
  loading: LazyWebpageComponentSpinner,
  error: LazyWebpageComponentError,
});

const Posts = memo(() => {
  const { t } = useTranslation();

  useHead({
    title: t('head.title.POSTS'),
    description: t('head.description.POSTS'),
  });

  return (
    <PostsContent />
  );
});

Posts.displayName = 'Posts';

export default Posts;
