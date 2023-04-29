import { memo, useState, useEffect } from 'react';
import Loadable from 'react-loadable';
import { childrenPropTypes } from '@client/prop-types';
import LazyComponentError from '@client/components/LazyLoading/LazyComponentError';
import LazyComponentSpinner from '@client/components/LazyLoading/LazyComponentSpinner';

const AsyncComponent = memo(({ component: Component }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 100);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  return isLoading ? null : Component;
});

AsyncComponent.displayName = 'AsyncComponent';

AsyncComponent.propTypes = {
  component: childrenPropTypes.isRequired,
};

export const lazyLoad = ({
  loader, error = LazyComponentError, loading = LazyComponentSpinner, delay = 200,
}) => Loadable({
  loader: () => new Promise((resolve) => {
    setTimeout(() => {
      resolve(loader());
    }, delay);
  }),
  loading: ({ error: err }) => {
    if (err) {
      const Error = error;
      return error ? <AsyncComponent component={<Error />} /> : null;
    }

    const Loading = loading;
    return loading ? <AsyncComponent component={<Loading />} /> : null;
  },
});
