import { memo } from 'react';
import { headingPropTypes } from '@client/prop-types/headingPropTypes';

const Heading = memo(({
  as: Component,
  children,
  ...restProps
}) => (
  <Component {...restProps}>
    {children}
  </Component>
));

Heading.displayName = 'Heading';

Heading.propTypes = headingPropTypes.props;

Heading.defaultProps = headingPropTypes.default;

export default Heading;
