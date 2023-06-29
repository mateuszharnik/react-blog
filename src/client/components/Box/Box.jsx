import { memo, forwardRef } from 'react';
import { boxPropTypes } from '@client/prop-types/boxPropTypes';

const Box = memo(forwardRef(({
  as: Component,
  children,
  ...restProps
}, boxRef) => (
  <Component
    {...restProps}
    ref={boxRef}
  >
    {children}
  </Component>
)));

Box.displayName = 'Box';

Box.propTypes = boxPropTypes.props;

Box.defaultProps = boxPropTypes.default;

export default Box;
