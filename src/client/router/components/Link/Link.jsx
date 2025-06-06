import { forwardRef } from 'react';
import { Link as DefaultLink } from 'react-router-dom';
import isString from 'lodash/isString';
import { linkPropTypes } from '@client/prop-types/linkPropTypes';

const Link = forwardRef(({
  to,
  className,
  children,
  ...restProps
}, linkRef) => {
  const isExternalLink = isString(to) && (to.startsWith('http') || to.startsWith('mailto:') || to.startsWith('#'));

  return isExternalLink ? (
    <a
      ref={linkRef}
      href={to}
      className={className}
      {...restProps}
    >
      {children}
    </a>
  ) : (
    <DefaultLink
      ref={linkRef}
      to={to}
      className={className}
      {...restProps}
    >
      {children}
    </DefaultLink>
  );
});

Link.displayName = 'Link';

Link.propTypes = linkPropTypes.props;

Link.defaultProps = linkPropTypes.default;

export default Link;
