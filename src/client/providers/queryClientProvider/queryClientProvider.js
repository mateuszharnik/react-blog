import { memo } from 'react';
import { QueryClientProvider as ReactQueryClientProvider, QueryClient } from 'react-query';
import { childrenPropTypes, childrenDefaultProps } from '@client/prop-types';

export const queryClient = new QueryClient();

const QueryClientProvider = memo(({ children }) => (
  <ReactQueryClientProvider client={queryClient}>
    {children}
  </ReactQueryClientProvider>
));

QueryClientProvider.displayName = 'QueryClientProvider';

QueryClientProvider.propTypes = {
  children: childrenPropTypes,
};

QueryClientProvider.defaultProps = {
  children: childrenDefaultProps,
};

export default QueryClientProvider;
