/* eslint-disable no-console */
import { memo } from 'react';
import { QueryClientProvider, QueryClient, setLogger } from 'react-query';
import { childrenPropTypes } from '@client/prop-types/childrenPropTypes';

export const testQueryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

setLogger({
  log: console.log,
  warn: console.warn,
  error: () => {},
});

const TestQueryClientProvider = memo(({ children }) => (
  <QueryClientProvider client={testQueryClient}>
    {children}
  </QueryClientProvider>
));

TestQueryClientProvider.displayName = 'TestQueryClientProvider';

TestQueryClientProvider.propTypes = {
  children: childrenPropTypes.props,
};

TestQueryClientProvider.defaultProps = {
  children: childrenPropTypes.default,
};

export default TestQueryClientProvider;
