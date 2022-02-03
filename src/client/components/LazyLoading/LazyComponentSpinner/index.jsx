import React, { memo } from 'react';
import Spinner from '@client/components/Spinner';
import LazyLoadingWrapper from '@client/components/LazyLoading/LazyLoadingWrapper';

const LazyComponentSpinner = memo(() => (
  <LazyLoadingWrapper>
    <Spinner />
  </LazyLoadingWrapper>
));

LazyComponentSpinner.displayName = 'LazyComponentSpinner';

export default LazyComponentSpinner;
