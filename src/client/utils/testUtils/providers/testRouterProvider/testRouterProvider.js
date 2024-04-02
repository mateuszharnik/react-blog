import { memo } from 'react';
import { string } from 'prop-types';
import { MemoryRouter } from 'react-router-dom';
import { envConfig } from '@client/configs/envConfig';
import { childrenPropTypes } from '@client/prop-types/childrenPropTypes';
import { routesConstants } from '@shared/constants';

const TestRouterProvider = memo(({ routerPath, children }) => (
  <MemoryRouter
    basename={envConfig.BASE_URL}
    initialEntries={[routerPath]}
  >
    {children}
  </MemoryRouter>
));

TestRouterProvider.displayName = 'TestRouterProvider';

TestRouterProvider.propTypes = {
  routerPath: string,
  children: childrenPropTypes.props,
};

TestRouterProvider.defaultProps = {
  routerPath: routesConstants.ROOT,
  children: childrenPropTypes.default,
};

export default TestRouterProvider;
