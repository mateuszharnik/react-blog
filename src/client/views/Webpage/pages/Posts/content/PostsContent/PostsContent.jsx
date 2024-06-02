import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import PageContainer from '@client/layouts/PageContainer';

const PostsContent = memo(() => {
  const { t } = useTranslation();

  return (
    <PageContainer>
      {t('head.title.POSTS')}
    </PageContainer>
  );
});

PostsContent.displayName = 'PostsContent';

export default PostsContent;
