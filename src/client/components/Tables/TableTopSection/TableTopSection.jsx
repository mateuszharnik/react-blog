import { memo, forwardRef } from 'react';
import { childrenPropTypes } from '@client/prop-types/childrenPropTypes';
import Box from '@client/components/Box';

const TableTopSection = memo(forwardRef(({
  children,
  ...restProps
}, tableTopSectionRef) => (
  <Box
    ref={tableTopSectionRef}
    {...restProps}
  >
    {children}
  </Box>
)));

TableTopSection.displayName = 'TableTopSection';

TableTopSection.propTypes = {
  children: childrenPropTypes.props,
};

TableTopSection.defaultProps = {
  children: childrenPropTypes.default,
};

export default TableTopSection;
