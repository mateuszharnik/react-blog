import { memo } from 'react';
import { QueryClientProvider as ReactQueryClientProvider } from 'react-query';
import { queryService } from '@client/services/queryService';
import { childrenPropTypes } from '@client/prop-types/childrenPropTypes';

const QueryClientProvider = memo(({ children }) => (
  <ReactQueryClientProvider client={queryService.client}>
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
