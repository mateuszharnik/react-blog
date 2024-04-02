import { memo, forwardRef } from 'react';
import { childrenPropTypes } from '@client/prop-types/childrenPropTypes';
import Box from '@client/components/Box';

const TableCounter = memo(forwardRef(({
  children,
  ...restProps
}, tableCounterRef) => (
  <Box
    ref={tableCounterRef}
    as="span"
    className="flex items-center gap-1"
    {...restProps}
  >
    <Box>Page</Box>
    <Box>
      {children}
    </Box>
  </Box>
)));

TableCounter.displayName = 'TableCounter';

TableCounter.propTypes = {
  children: childrenPropTypes.props,
};

TableCounter.defaultProps = {
  children: childrenPropTypes.default,
};

export default TableCounter;
