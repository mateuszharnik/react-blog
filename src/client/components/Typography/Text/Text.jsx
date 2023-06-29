import { memo } from 'react';
import { textPropTypes } from '@client/prop-types/textPropTypes';

const Text = memo(({
  as: Component,
  children,
  ...restProps
}) => (
  <Component {...restProps}>
    {children}
  </Component>
));

Text.displayName = 'Text';

Text.propTypes = textPropTypes.props;

Text.defaultProps = textPropTypes.default;

export default Text;
