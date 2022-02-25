import React, { useEffect, memo } from 'react';
import PageWrapper from '@client/components/PageWrapper';
import { setTitle, setMeta, postsMeta } from '@client/helpers/documentMeta';

const Posts = memo(() => {
  useEffect(() => {
    setTitle('Posty');
    setMeta(postsMeta());
  }, []);

  return (
    <PageWrapper>
      Wszystkie posty
    </PageWrapper>
  );
});

Posts.displayName = 'Posts';

export default Posts;
