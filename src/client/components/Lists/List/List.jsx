import { memo, forwardRef } from 'react';
import { listPropTypes } from '@client/prop-types/listPropTypes';

const List = memo(forwardRef(({
  as: Component,
  children,
  ...restProps
}, listRef) => (
  <Component
    {...restProps}
    ref={listRef}
  >
    {children}
  </Component>
)));

List.displayName = 'List';

List.propTypes = listPropTypes.props;

List.defaultProps = listPropTypes.default;

export default List;
