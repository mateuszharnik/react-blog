import React, { useEffect, memo } from 'react';
import { useStoreActions } from 'easy-peasy';
import PageContainer from '@client/components/Layouts/PageContainer';
import { setTitle, setMeta, postsMeta } from '@client/helpers/documentMeta';

const Posts = memo(() => {
  const { removeLayer } = useStoreActions((actions) => actions.layer);

  useEffect(() => {
    setTitle('Posty');
    setMeta(postsMeta());

    removeLayer();
  }, []);

  return (
    <PageContainer>
      Wszystkie posty
    </PageContainer>
  );
});

Posts.displayName = 'Posts';

export default Posts;
