import React from 'react';
import Loadable from 'react-loadable';
import LazyPageError from '@client/components/LazyLoading/LazyPageError';
import LazyPageSpinner from '@client/components/LazyLoading/LazyPageSpinner';

const lazyLoad = (options = {}) => Loadable({
  loading: ({ error }) => (error ? <LazyPageError /> : <LazyPageSpinner />),
  delay: 200,
  ...options,
});

export default lazyLoad;
