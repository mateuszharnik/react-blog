import { memo, forwardRef } from 'react';
import { childrenPropTypes } from '@client/prop-types/childrenPropTypes';

const TableHead = memo(forwardRef(({
  children,
  ...restProps
}, tableHeadRef) => (
  <thead
    ref={tableHeadRef}
    {...restProps}
  >
    {children}
  </thead>
)));

TableHead.displayName = 'TableHead';

TableHead.propTypes = {
  children: childrenPropTypes.props,
};

TableHead.defaultProps = {
  children: childrenPropTypes.default,
};

export default TableHead;
