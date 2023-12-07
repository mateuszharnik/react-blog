import { memo } from 'react';
import { navLinkPropTypes } from '@client/prop-types/navLinkPropTypes';
import { testsConstants } from '@shared/constants';
import ExactActiveLink from '@client/router/components/ExactActiveLink';
import Box from '@client/components/Box';

const NavLink = memo(({
  onBlur,
  to,
  title,
  children,
  dataNav,
  dataDropdownNav,
  id,
  ...restProps
}) => (
  <ExactActiveLink
    id={id}
    to={to}
    data-testid={`${testsConstants.NAV_LINK}${id ? `-${id}` : ''}`}
    title={title}
    data-nav={dataNav}
    data-dropdown-nav={dataDropdownNav}
    className="nav__link mx-auto"
    {...restProps}
    onBlur={onBlur}
  >
    <Box
      as="span"
      data-testid={`${testsConstants.NAV_LINK_TEXT}${id ? `-${id}` : ''}`}
      className="nav__text"
    >
      {children}
    </Box>
  </ExactActiveLink>
));

NavLink.displayName = 'NavLink';

NavLink.propTypes = navLinkPropTypes.props;

NavLink.defaultProps = navLinkPropTypes.default;

export default NavLink;
