import { memo } from 'react';
import { childrenPropTypes } from '@client/prop-types/childrenPropTypes';
import { testsConstants } from '@shared/constants';
import MaxViewHeight from '@client/components/MaxViewHeight';
import Box from '@client/components/Box';

const AuthWrapper = memo(({ children, ...restProps }) => (
  <MaxViewHeight>
    <Box
      data-testid={testsConstants.AUTH_WRAPPER}
      className="auth-wrapper"
      {...restProps}
    >
      {children}
    </Box>
  </MaxViewHeight>
));

AuthWrapper.displayName = 'AuthWrapper';

AuthWrapper.propTypes = {
  children: childrenPropTypes.props,
};

AuthWrapper.defaultProps = {
  children: childrenPropTypes.default,
};

export default AuthWrapper;
