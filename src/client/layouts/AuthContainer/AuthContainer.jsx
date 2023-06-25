import { memo } from 'react';
import { childrenPropTypes, childrenDefaultProps } from '@client/prop-types';
import { testsConstants } from '@shared/constants';

const AuthContainer = memo(({ children }) => (
  <div
    data-testid={testsConstants.AUTH_CONTAINER}
    className="auth-container"
  >
    {children}
  </div>
));

AuthContainer.displayName = 'AuthContainer';

AuthContainer.propTypes = {
  children: childrenPropTypes,
};

AuthContainer.defaultProps = {
  children: childrenDefaultProps,
};

export default AuthContainer;
