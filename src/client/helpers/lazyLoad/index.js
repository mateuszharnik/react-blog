import React, { memo, useState, useEffect } from 'react';
import { arrayOf, oneOfType, node } from 'prop-types';
import Loadable from 'react-loadable';
import LazyPageError from '@client/components/LazyLoading/LazyPageError';
import LazyPageSpinner from '@client/components/LazyLoading/LazyPageSpinner';

const Timeout = memo(({ component }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 100);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  return isLoading ? null : component;
});

Timeout.displayName = 'Timeout';

Timeout.propTypes = {
  component: oneOfType([arrayOf(node), node]).isRequired,
};

const lazyLoad = ({
  loader, error = LazyPageError, loading = LazyPageSpinner, delay = 200,
}) => Loadable({
  loader: () => new Promise((resolve) => {
    setTimeout(() => {
      resolve(loader());
    }, delay);
  }),
  loading: ({ error: err }) => {
    if (err) {
      const Error = error;
      return error ? <Timeout component={<Error />} /> : null;
    }

    const Loading = loading;
    return loading ? <Timeout component={<Loading />} /> : null;
  },
});

export default lazyLoad;
