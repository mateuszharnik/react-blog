import { memo } from 'react';
import { navLinkPropTypes, navLinkDefaultProps } from '@client/prop-types';
import { testsConstants } from '@shared/constants';
import ExactActiveLink from '@client/router/components/ExactActiveLink';

const NavLink = memo(({
  onBlur,
  to,
  title,
  children,
  dataNav,
  dataDropdownNav,
  id,
}) => (
  <ExactActiveLink
    id={id}
    to={to}
    data-testid={`${testsConstants.NAV_LINK}${id ? `-${id}` : ''}`}
    title={title}
    data-nav={dataNav}
    data-dropdown-nav={dataDropdownNav}
    linkClassName="nav__link mx-auto"
    onBlur={onBlur}
  >
    <span
      data-testid={`${testsConstants.NAV_LINK_TEXT}${id ? `-${id}` : ''}`}
      className="nav__text"
    >
      {children}
    </span>
  </ExactActiveLink>
));

NavLink.displayName = 'NavLink';

NavLink.propTypes = navLinkPropTypes;

NavLink.defaultProps = navLinkDefaultProps;

export default NavLink;
