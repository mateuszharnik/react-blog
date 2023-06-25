import { memo } from 'react';
import { childrenPropTypes, childrenDefaultProps } from '@client/prop-types';
import { testsConstants } from '@shared/constants';

const PageContainer = memo(({ children }) => (
  <div
    data-testid={testsConstants.PAGE_CONTAINER}
    className="page-container mx-auto"
  >
    {children}
  </div>
));

PageContainer.displayName = 'PageContainer';

PageContainer.propTypes = {
  children: childrenPropTypes,
};

PageContainer.defaultProps = {
  children: childrenDefaultProps,
};

export default PageContainer;
