import { memo } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { envConfig } from '@client/configs/envConfig';
import { childrenPropTypes, childrenDefaultProps } from '@client/prop-types';

const RouterProvider = memo(({ children }) => (
  <BrowserRouter basename={envConfig.BASE_URL}>
    {children}
  </BrowserRouter>
));

RouterProvider.displayName = 'RouterProvider';

RouterProvider.propTypes = {
  children: childrenPropTypes,
};

RouterProvider.defaultProps = {
  children: childrenDefaultProps,
};

export default RouterProvider;
