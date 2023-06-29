import { memo } from 'react';
import { StoreProvider as EasyPeasyStoreProvider } from 'easy-peasy';
import { store } from '@client/store';
import { childrenPropTypes } from '@client/prop-types/childrenPropTypes';

const StoreProvider = memo(({ children }) => (
  <EasyPeasyStoreProvider store={store}>
    {children}
  </EasyPeasyStoreProvider>
));

StoreProvider.displayName = 'StoreProvider';

StoreProvider.propTypes = {
  children: childrenPropTypes.props,
};

StoreProvider.defaultProps = {
  children: childrenPropTypes.default,
};

export default StoreProvider;
