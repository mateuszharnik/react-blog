import React, { memo } from 'react';
import Error from '@client/components/Error';
import LazyComponentWrapper from '@client/components/LazyComponent/LazyComponentWrapper';

const LazyComponentError = memo(() => (
  <LazyComponentWrapper>
    <Error />
  </LazyComponentWrapper>
));

LazyComponentError.displayName = 'LazyComponentError';

export default LazyComponentError;
