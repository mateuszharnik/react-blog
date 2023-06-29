import { memo } from 'react';
import { childrenPropTypes } from '@client/prop-types/childrenPropTypes';
import { testsConstants } from '@shared/constants';
import Box from '@client/components/Box';

const PageWrapper = memo(({ children }) => (
  <Box
    data-testid={testsConstants.PAGE_WRAPPER}
    className="page-wrapper"
  >
    {children}
  </Box>
));

PageWrapper.displayName = 'PageWrapper';

PageWrapper.propTypes = {
  children: childrenPropTypes.props,
};

PageWrapper.defaultProps = {
  children: childrenPropTypes.default,
};

export default PageWrapper;
