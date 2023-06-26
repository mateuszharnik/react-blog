import { memo } from 'react';
import { QueryClientProvider as ReactQueryClientProvider, QueryClient } from 'react-query';
import { childrenPropTypes } from '@client/prop-types/childrenPropTypes';

export const queryClient = new QueryClient();

const QueryClientProvider = memo(({ children }) => (
  <ReactQueryClientProvider client={queryClient}>
    {children}
  </ReactQueryClientProvider>
));

QueryClientProvider.displayName = 'QueryClientProvider';

QueryClientProvider.propTypes = {
  children: childrenPropTypes.props,
};

QueryClientProvider.defaultProps = {
  children: childrenPropTypes.default,
};

export default QueryClientProvider;
