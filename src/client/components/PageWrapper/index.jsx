import React, { memo } from 'react';
import { oneOfType, arrayOf, node } from 'prop-types';

const PageWrapper = memo(({ children }) => (
  <div className="page-wrapper">
    {children}
  </div>
));

PageWrapper.displayName = 'PageWrapper';

PageWrapper.propTypes = {
  children: oneOfType([arrayOf(node), node]),
};

PageWrapper.defaultProps = {
  children: null,
};

export default PageWrapper;
