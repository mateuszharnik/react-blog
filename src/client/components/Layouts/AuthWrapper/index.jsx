import React, { memo } from 'react';
import { oneOfType, arrayOf, node } from 'prop-types';
import testIds from '@shared/testIds';
import MaxViewHeight from '@client/components/MaxViewHeight';

const AuthWrapper = memo(({ children }) => (
  <MaxViewHeight>
    <div
      data-testid={testIds.AuthWrapper}
      className="auth-wrapper"
    >
      {children}
    </div>
  </MaxViewHeight>
));

AuthWrapper.displayName = 'AuthWrapper';

AuthWrapper.propTypes = {
  children: oneOfType([arrayOf(node), node]),
};

AuthWrapper.defaultProps = {
  children: null,
};

export default AuthWrapper;
