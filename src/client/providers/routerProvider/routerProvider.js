import { memo } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { envConfig } from '@client/configs/envConfig';
import { childrenPropTypes } from '@client/prop-types/childrenPropTypes';

const RouterProvider = memo(({ children }) => (
  <BrowserRouter basename={envConfig.BASE_URL}>
    {children}
  </BrowserRouter>
));

RouterProvider.displayName = 'RouterProvider';

RouterProvider.propTypes = {
  children: childrenPropTypes.props,
};

RouterProvider.defaultProps = {
  children: childrenPropTypes.default,
};

export default RouterProvider;
