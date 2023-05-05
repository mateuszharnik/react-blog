import { Component } from 'react';
import { childrenPropTypes, childrenDefaultProps } from '@client/prop-types';
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
  children: childrenPropTypes,
};

ErrorBoundary.defaultProps = {
  children: childrenDefaultProps,
};

export default ErrorBoundary;
