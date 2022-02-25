import React, { memo } from 'react';
import { NavLink as Link } from 'react-router-dom';
import {
  oneOfType, arrayOf, node, string, func,
} from 'prop-types';

const NavLink = memo(({
  onBlur, to, title, children, dataNav, dataDropdownNav,
}) => (
  <Link
    to={to}
    end
    title={title}
    className={({ isActive }) => (isActive ? 'nav__link mx-auto active' : 'nav__link mx-auto')}
    onBlur={onBlur}
    data-nav={dataNav}
    data-dropdown-nav={dataDropdownNav}
  >
    {({ isActive }) => (
      <>
        <span className="nav__text">{children}</span>{' '}
        {isActive && <span className="visually-hidden">(Jesteś tutaj)</span>}
      </>
    )}
  </Link>
));

NavLink.displayName = 'NavLink';

NavLink.propTypes = {
  children: oneOfType([arrayOf(node), node]).isRequired,
  title: string.isRequired,
  to: string.isRequired,
  onBlur: func,
  dataNav: string,
  dataDropdownNav: string,
};

NavLink.defaultProps = {
  onBlur: () => {},
  dataNav: null,
  dataDropdownNav: null,
};

export default NavLink;
