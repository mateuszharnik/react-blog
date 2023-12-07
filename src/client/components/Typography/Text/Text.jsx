import { memo, forwardRef } from 'react';
import { textPropTypes } from '@client/prop-types/textPropTypes';

const Text = memo(forwardRef(({
  as: Component,
  children,
  ...restProps
}, textRef) => (
  <Component
    ref={textRef}
    {...restProps}
  >
    {children}
  </Component>
)));

Text.displayName = 'Text';

Text.propTypes = textPropTypes.props;

Text.defaultProps = textPropTypes.default;

export default Text;
