import React from 'react';
import Loadable from 'react-loadable';
import LazyPageError from '@client/components/LazyLoading/LazyPageError';
import LazyPageSpinner from '@client/components/LazyLoading/LazyPageSpinner';

const lazyLoadView = (options = {}) => Loadable({
  loading: ({ error }) => (error ? <LazyPageError /> : <LazyPageSpinner />),
  delay: 0,
  ...options,
});

export default lazyLoadView;
