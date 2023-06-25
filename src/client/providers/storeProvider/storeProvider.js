import { memo } from 'react';
import { StoreProvider as EasyPeasyStoreProvider } from 'easy-peasy';
import { store } from '@client/store';
import { childrenPropTypes, childrenDefaultProps } from '@client/prop-types';

const StoreProvider = memo(({ children }) => (
  <EasyPeasyStoreProvider store={store}>
    {children}
  </EasyPeasyStoreProvider>
));

StoreProvider.displayName = 'StoreProvider';

StoreProvider.propTypes = {
  children: childrenPropTypes,
};

StoreProvider.defaultProps = {
  children: childrenDefaultProps,
};

export default StoreProvider;
