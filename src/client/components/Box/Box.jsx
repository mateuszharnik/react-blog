import { forwardRef } from 'react';
import { boxPropTypes } from '@client/prop-types/boxPropTypes';

const Box = forwardRef(({
  as: Component,
  children,
  ...restProps
}, boxRef) => (
  <Component
    ref={boxRef}
    {...restProps}
  >
    {children}
  </Component>
));

Box.displayName = 'Box';

Box.propTypes = boxPropTypes.props;

Box.defaultProps = boxPropTypes.default;

export default Box;
