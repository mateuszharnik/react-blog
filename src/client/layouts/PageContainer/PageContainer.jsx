import { memo } from 'react';
import { childrenPropTypes } from '@client/prop-types/childrenPropTypes';
import { testsConstants } from '@shared/constants';
import Box from '@client/components/Box';

const PageContainer = memo(({ children, ...restProps }) => (
  <Box
    data-testid={testsConstants.PAGE_CONTAINER}
    className="page-container mx-auto"
    {...restProps}
  >
    {children}
  </Box>
));

PageContainer.displayName = 'PageContainer';

PageContainer.propTypes = {
  children: childrenPropTypes.props,
};

PageContainer.defaultProps = {
  children: childrenPropTypes.default,
};

export default PageContainer;
