import { memo } from 'react';
import Spinner from '@client/components/Spinner';
import LazyLoadingWrapper from '@client/components/LazyLoading/LazyLoadingWrapper';

const LazyWebpageComponentSpinner = memo(() => (
  <LazyLoadingWrapper offsetTop={84}>
    <Spinner />
  </LazyLoadingWrapper>
));

LazyWebpageComponentSpinner.displayName = 'LazyWebpageComponentSpinner';

export default LazyWebpageComponentSpinner;
