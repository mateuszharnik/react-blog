import { memo, forwardRef } from 'react';
import { childrenPropTypes } from '@client/prop-types/childrenPropTypes';
import Box from '@client/components/Box';

const TableBottomSection = memo(forwardRef(({
  children,
  ...restProps
}, tableBottomSectionRef) => (
  <Box
    ref={tableBottomSectionRef}
    {...restProps}
  >
    {children}
  </Box>
)));

TableBottomSection.displayName = 'TableBottomSection';

TableBottomSection.propTypes = {
  children: childrenPropTypes.props,
};

TableBottomSection.defaultProps = {
  children: childrenPropTypes.default,
};

export default TableBottomSection;
