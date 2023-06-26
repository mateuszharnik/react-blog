import { memo, useMemo } from 'react';
import { Link as DefaultLink } from 'react-router-dom';
import isString from 'lodash/isString';
import { linkPropTypes } from '@client/prop-types/linkPropTypes';

const Link = memo(({
  to, className, children, ...restProps
}) => {
  const isExternalLink = useMemo(() => isString(to) && (to.startsWith('http') || to.startsWith('mailto:') || to.startsWith('#')), [to]);

  return isExternalLink ? (
    <a
      href={to}
      className={className}
      {...restProps}
    >
      {children}
    </a>
  ) : (
    <DefaultLink
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
