import React, { memo } from 'react';
import Error from '@client/components/Error';
import LazyLoadingWrapper from '@client/components/LazyLoading/LazyLoadingWrapper';

const LazyPageError = memo(() => (
  <LazyLoadingWrapper page>
    <Error />
  </LazyLoadingWrapper>
));

LazyPageError.displayName = 'LazyPageError';

export default LazyPageError;
