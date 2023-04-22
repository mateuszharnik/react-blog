import { memo } from 'react';
import Spinner from '@client/components/Spinner';
import LazyLoadingWrapper from '@client/components/LazyLoading/LazyLoadingWrapper';

const LazyAdminComponentSpinner = memo(() => (
  <LazyLoadingWrapper wrapperClassName="lazy-loading-admin-wrapper">
    <Spinner />
  </LazyLoadingWrapper>
));

LazyAdminComponentSpinner.displayName = 'LazyAdminComponentSpinner';

export default LazyAdminComponentSpinner;
