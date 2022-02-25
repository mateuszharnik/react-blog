import React, { useEffect, memo } from 'react';
import { useStoreActions } from 'easy-peasy';
import PageWrapper from '@client/components/PageWrapper';
import { setTitle, setMeta, postsMeta } from '@client/helpers/documentMeta';

const Posts = memo(() => {
  const { removeLayer } = useStoreActions((actions) => actions.layer);

  useEffect(() => {
    setTitle('Posty');
    setMeta(postsMeta());

    removeLayer();
  }, []);

  return (
    <PageWrapper>
      Wszystkie posty
    </PageWrapper>
  );
});

Posts.displayName = 'Posts';

export default Posts;
