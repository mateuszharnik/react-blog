import React, { memo } from 'react';
import { oneOfType, arrayOf, node } from 'prop-types';

const AuthContainer = memo(({ children }) => (
  <div className="auth-container">
    {children}
  </div>
));

AuthContainer.displayName = 'AuthContainer';

AuthContainer.propTypes = {
  children: oneOfType([arrayOf(node), node]),
};

AuthContainer.defaultProps = {
  children: null,
};

export default AuthContainer;
