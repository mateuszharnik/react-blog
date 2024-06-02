import { Component } from 'react';
import { childrenPropTypes } from '@client/prop-types/childrenPropTypes';
import LazyLoadingWrapper from '@client/components/LazyLoading/LazyLoadingWrapper';
import Error from '@client/components/Errors/Error';
import Box from '@client/components/Box';

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

    return (
      <Box>
        {error ? (
          <LazyLoadingWrapper>
            <Error />
          </LazyLoadingWrapper>
        ) : children}
      </Box>
    );
  }
}

ErrorBoundary.displayName = 'ErrorBoundary';

ErrorBoundary.propTypes = {
  children: childrenPropTypes.props,
};

ErrorBoundary.defaultProps = {
  children: childrenPropTypes.default,
};

export default ErrorBoundary;
