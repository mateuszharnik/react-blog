import { memo } from 'react';
import Error from '@client/components/Errors/Error';
import LazyLoadingWrapper from '@client/components/LazyLoading/LazyLoadingWrapper';

const LazyAdminComponentError = memo(() => (
  <LazyLoadingWrapper className="lazy-loading-admin-wrapper">
    <Error />
  </LazyLoadingWrapper>
));

LazyAdminComponentError.displayName = 'LazyAdminComponentError';

export default LazyAdminComponentError;
