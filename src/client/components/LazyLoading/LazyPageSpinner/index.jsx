import React, { memo } from 'react';
import Spinner from '@client/components/Spinner';
import LazyLoadingWrapper from '@client/components/LazyLoading/LazyLoadingWrapper';

const LazyPageSpinner = memo(() => (
  <LazyLoadingWrapper page>
    <Spinner />
  </LazyLoadingWrapper>
));

LazyPageSpinner.displayName = 'LazyPageSpinner';

export default LazyPageSpinner;
