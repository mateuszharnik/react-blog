import { memo, useEffect } from 'react';
import { useAbout } from '@client/store/about';
import { useWebpageLayerContext } from '@client/views/Webpage/contexts/WebpageLayerContext';
import Spinner from '@client/components/Spinner';
import UpdateAboutForm from '@client/forms/UpdateAboutForm';
import PageContainer from '@client/layouts/PageContainer';
import Box from '@client/components/Box';

const EditAbout = memo(() => {
  const { hideWebpageLayer } = useWebpageLayerContext();

  const { utils: { getAboutMetadata } } = useAbout({ key: 'update' });

  useEffect(() => {
    if (getAboutMetadata.isFinished) {
      hideWebpageLayer();
    }
  }, [getAboutMetadata.isFinished]);

  return (
    <PageContainer>
      {getAboutMetadata.isLoading ? (
        <Box className="position-component-center">
          <Spinner />
        </Box>
      ) : (
        <UpdateAboutForm />
      )}
    </PageContainer>
  );
});

EditAbout.displayName = 'EditAbout';

export default EditAbout;
