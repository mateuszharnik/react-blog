import Error from '@client/components/Errors/Error';
import LazyLoadingWrapper from '@client/components/LazyLoading/LazyLoadingWrapper';

const LazyWebpageComponentError = () => (
  <LazyLoadingWrapper offsetTop={84}>
    <Error />
  </LazyLoadingWrapper>
);

LazyWebpageComponentError.displayName = 'LazyWebpageComponentError';

export default LazyWebpageComponentError;
