import { memo } from 'react';
import { childrenPropTypes, childrenDefaultProps } from '@client/prop-types';
import { testsConstants } from '@shared/constants';

const PageWrapper = memo(({ children }) => (
  <div
    data-testid={testsConstants.PAGE_WRAPPER}
    className="page-wrapper"
  >
    {children}
  </div>
));

PageWrapper.displayName = 'PageWrapper';

PageWrapper.propTypes = {
  children: childrenPropTypes,
};

PageWrapper.defaultProps = {
  children: childrenDefaultProps,
};

export default PageWrapper;
