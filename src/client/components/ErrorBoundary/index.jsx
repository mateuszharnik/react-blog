import React, { Component } from 'react';
import { oneOfType, arrayOf, node } from 'prop-types';
import LazyLoadingWrapper from '@client/components/LazyLoading/LazyLoadingWrapper';
import Error from '@client/components/Error';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error) {
    return { error };
  }

  render() {
    const { error } = this.state;
    const { children } = this.props;

    if (error) {
      return (
        <LazyLoadingWrapper>
          <Error />
        </LazyLoadingWrapper>
      );
    }

    return children;
  }
}

ErrorBoundary.displayName = 'ErrorBoundary';

ErrorBoundary.propTypes = {
  children: oneOfType([arrayOf(node), node]),
};

ErrorBoundary.defaultProps = {
  children: null,
};

export default ErrorBoundary;
