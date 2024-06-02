import { memo, forwardRef } from 'react';
import { childrenPropTypes } from '@client/prop-types/childrenPropTypes';

const TableBody = memo(forwardRef(({
  children,
  ...restProps
}, tableBodyRef) => (
  <tbody
    ref={tableBodyRef}
    {...restProps}
  >
    {children}
  </tbody>
)));

TableBody.displayName = 'TableBody';

TableBody.propTypes = {
  children: childrenPropTypes.props,
};

TableBody.defaultProps = {
  children: childrenPropTypes.default,
};

export default TableBody;
