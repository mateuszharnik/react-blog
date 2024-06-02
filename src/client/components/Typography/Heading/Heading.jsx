import { memo, forwardRef } from 'react';
import { headingPropTypes } from '@client/prop-types/headingPropTypes';

const Heading = memo(forwardRef(({
  as: Component,
  children,
  ...restProps
}, headingRef) => (
  <Component
    ref={headingRef}
    {...restProps}
  >
    {children}
  </Component>
)));

Heading.displayName = 'Heading';

Heading.propTypes = headingPropTypes.props;

Heading.defaultProps = headingPropTypes.default;

export default Heading;
