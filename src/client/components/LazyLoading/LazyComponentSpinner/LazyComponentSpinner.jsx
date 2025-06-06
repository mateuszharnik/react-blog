import Spinner from '@client/components/Spinner';
import LazyLoadingWrapper from '@client/components/LazyLoading/LazyLoadingWrapper';

const LazyComponentSpinner = (props) => (
  <LazyLoadingWrapper {...props}>
    <Spinner />
  </LazyLoadingWrapper>
);

LazyComponentSpinner.displayName = 'LazyComponentSpinner';

export default LazyComponentSpinner;
