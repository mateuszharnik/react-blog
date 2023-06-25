import { memo } from 'react';
import { headingPropTypes, headingDefaultProps } from '@client/prop-types';

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

Heading.propTypes = headingPropTypes;

Heading.defaultProps = headingDefaultProps;

export default Heading;
