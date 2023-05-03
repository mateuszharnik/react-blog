import { memo } from 'react';
import { childrenPropTypes, childrenDefaultProps } from '@client/prop-types';
import { testsConstants } from '@shared/constants';
import MaxViewHeight from '@client/components/MaxViewHeight';

const AuthWrapper = memo(({ children }) => (
  <MaxViewHeight>
    <div
      data-testid={testsConstants.AUTH_WRAPPER}
      className="auth-wrapper"
    >
      {children}
    </div>
  </MaxViewHeight>
));

AuthWrapper.displayName = 'AuthWrapper';

AuthWrapper.propTypes = {
  children: childrenPropTypes,
};

AuthWrapper.defaultProps = {
  children: childrenDefaultProps,
};

export default AuthWrapper;
