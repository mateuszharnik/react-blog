import Error from '@client/components/Errors/Error';
import LazyLoadingWrapper from '@client/components/LazyLoading/LazyLoadingWrapper';

const LazyComponentError = (props) => (
  <LazyLoadingWrapper {...props}>
    <Error />
  </LazyLoadingWrapper>
);

LazyComponentError.displayName = 'LazyComponentError';

export default LazyComponentError;
