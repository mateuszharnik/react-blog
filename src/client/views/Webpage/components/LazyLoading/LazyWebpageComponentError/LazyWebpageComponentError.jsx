import { memo } from 'react';
import Error from '@client/components/Error';
import LazyLoadingWrapper from '@client/components/LazyLoading/LazyLoadingWrapper';

const LazyWebpageComponentError = memo(() => (
  <LazyLoadingWrapper offsetTop={84}>
    <Error />
  </LazyLoadingWrapper>
));

LazyWebpageComponentError.displayName = 'LazyWebpageComponentError';

export default LazyWebpageComponentError;
