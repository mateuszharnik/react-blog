import React, { memo } from 'react';
import { oneOfType, arrayOf, node } from 'prop-types';

const PageContainer = memo(({ children }) => (
  <div className="page-container mx-auto">
    {children}
  </div>
));

PageContainer.displayName = 'PageContainer';

PageContainer.propTypes = {
  children: oneOfType([arrayOf(node), node]),
};

PageContainer.defaultProps = {
  children: null,
};

export default PageContainer;
