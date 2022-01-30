import React, { memo } from 'react';
import Spinner from '@client/components/Spinner';
import LazyComponentWrapper from '@client/components/LazyComponent/LazyComponentWrapper';

const LazyComponentSpinner = memo(() => (
  <LazyComponentWrapper>
    <Spinner />
  </LazyComponentWrapper>
));

LazyComponentSpinner.displayName = 'LazyComponentSpinner';

export default LazyComponentSpinner;
