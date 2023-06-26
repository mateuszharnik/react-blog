import { memo } from 'react';
import { childrenPropTypes } from '@client/prop-types/childrenPropTypes';
import { testsConstants } from '@shared/constants';
import Box from '@client/components/Box';

const AuthContainer = memo(({ children }) => (
  <Box
    data-testid={testsConstants.AUTH_CONTAINER}
    className="auth-container"
  >
    {children}
  </Box>
));

AuthContainer.displayName = 'AuthContainer';

AuthContainer.propTypes = {
  children: childrenPropTypes.props,
};

AuthContainer.defaultProps = {
  children: childrenPropTypes.default,
};

export default AuthContainer;
