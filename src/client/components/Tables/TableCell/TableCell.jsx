import { memo, forwardRef } from 'react';
import { childrenPropTypes } from '@client/prop-types/childrenPropTypes';

const TableCell = memo(forwardRef(({
  children,
  ...restProps
}, tableCellRef) => (
  <td
    ref={tableCellRef}
    {...restProps}
  >
    {children}
  </td>
)));

TableCell.displayName = 'TableCell';

TableCell.propTypes = {
  children: childrenPropTypes.props,
};

TableCell.defaultProps = {
  children: childrenPropTypes.default,
};

export default TableCell;
