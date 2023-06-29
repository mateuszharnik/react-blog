import { memo } from 'react';
import Error from '@client/components/Errors/Error';
import LazyLoadingWrapper from '@client/components/LazyLoading/LazyLoadingWrapper';

const LazyComponentError = memo(() => (
  <LazyLoadingWrapper>
    <Error />
  </LazyLoadingWrapper>
));

LazyComponentError.displayName = 'LazyComponentError';

export default LazyComponentError;
