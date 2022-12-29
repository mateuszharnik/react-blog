import React, { memo } from 'react';
import { oneOfType, arrayOf, node } from 'prop-types';
import testIds from '@shared/testIds';

const AuthContainer = memo(({ children }) => (
  <div
    data-testid={testIds.AuthContainer}
    className="auth-container"
  >
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
