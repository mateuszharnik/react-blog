import { memo, forwardRef } from 'react';
import { childrenPropTypes } from '@client/prop-types/childrenPropTypes';

const ListItem = memo(forwardRef(({
  children,
  ...restProps
}, listItemRef) => (
  <li
    {...restProps}
    ref={listItemRef}
  >
    {children}
  </li>
)));

ListItem.displayName = 'ListItem';

ListItem.propTypes = {
  children: childrenPropTypes.props,
};

ListItem.defaultProps = {
  children: childrenPropTypes.default,
};

export default ListItem;
