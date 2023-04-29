import { memo, useMemo } from 'react';
import { Link as DefaultLink } from 'react-router-dom';
import isString from 'lodash/isString';
import { linkPropTypes, linkDefaultProps } from '@client/prop-types';

const Link = memo(({
  to, linkClassName, children, ...restProps
}) => {
  const isExternalLink = useMemo(() => isString(to) && to.startsWith('http'), [to]);

  return isExternalLink ? (
    <a
      href={to}
      className={linkClassName}
      {...restProps}
    >
      {children}
    </a>
  ) : (
    <DefaultLink
      to={to}
      className={linkClassName}
      {...restProps}
    >
      {children}
    </DefaultLink>
  );
});

Link.displayName = 'Link';

Link.propTypes = linkPropTypes;

Link.defaultProps = linkDefaultProps;

export default Link;
