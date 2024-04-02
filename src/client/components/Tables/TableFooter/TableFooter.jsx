import { memo, forwardRef } from 'react';
import { childrenPropTypes } from '@client/prop-types/childrenPropTypes';

const TableFooter = memo(forwardRef(({
  children,
  ...restProps
}, tableFooterRef) => (
  <tfoot
    ref={tableFooterRef}
    {...restProps}
  >
    {children}
  </tfoot>
)));

TableFooter.displayName = 'TableFooter';

TableFooter.propTypes = {
  children: childrenPropTypes.props,
};

TableFooter.defaultProps = {
  children: childrenPropTypes.default,
};

export default TableFooter;
