import { forwardRef } from 'react';
import { listPropTypes } from '@client/prop-types/listPropTypes';

const List = forwardRef(({
  as: Component,
  children,
  ...restProps
}, listRef) => (
  <Component
    ref={listRef}
    {...restProps}
  >
    {children}
  </Component>
));

List.displayName = 'List';

List.propTypes = listPropTypes.props;

List.defaultProps = listPropTypes.default;

export default List;
