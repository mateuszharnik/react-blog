import React, { memo } from 'react';
import { oneOfType, arrayOf, node } from 'prop-types';
import testIds from '@shared/testIds';

const PageContainer = memo(({ children }) => (
  <div
    data-testid={testIds.PageContainer}
    className="page-container mx-auto"
  >
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
