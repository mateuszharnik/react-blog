import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import PageContainer from '@client/layouts/PageContainer';

const Posts = memo(() => {
  const { t } = useTranslation();

  return (
    <PageContainer>
      {t('head.title.POSTS')}
    </PageContainer>
  );
});

Posts.displayName = 'Posts';

export default Posts;
