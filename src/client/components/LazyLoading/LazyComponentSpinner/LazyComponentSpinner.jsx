import { memo } from 'react';
import Spinner from '@client/components/Spinner';
import LazyLoadingWrapper from '@client/components/LazyLoading/LazyLoadingWrapper';

const LazyComponentSpinner = memo((props) => (
  <LazyLoadingWrapper {...props}>
    <Spinner />
  </LazyLoadingWrapper>
));

LazyComponentSpinner.displayName = 'LazyComponentSpinner';

export default LazyComponentSpinner;
