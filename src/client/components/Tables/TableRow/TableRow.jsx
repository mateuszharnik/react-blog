import { memo, forwardRef } from 'react';
import { childrenPropTypes } from '@client/prop-types/childrenPropTypes';

const TableRow = memo(forwardRef(({
  children,
  ...restProps
}, tableRowRef) => (
  <tr
    ref={tableRowRef}
    {...restProps}
  >
    {children}
  </tr>
)));

TableRow.displayName = 'TableRow';

TableRow.propTypes = {
  children: childrenPropTypes.props,
};

TableRow.defaultProps = {
  children: childrenPropTypes.default,
};

export default TableRow;
