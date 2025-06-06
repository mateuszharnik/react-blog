import Spinner from '@client/components/Spinner';
import LazyLoadingWrapper from '@client/components/LazyLoading/LazyLoadingWrapper';

const LazyWebpageComponentSpinner = () => (
  <LazyLoadingWrapper offsetTop={84}>
    <Spinner />
  </LazyLoadingWrapper>
);

LazyWebpageComponentSpinner.displayName = 'LazyWebpageComponentSpinner';

export default LazyWebpageComponentSpinner;
