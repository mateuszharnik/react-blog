import React, { memo } from 'react';
import { NavLink as Link } from 'react-router-dom';
import {
  oneOfType, arrayOf, node, string, func,
} from 'prop-types';

const NavLink = memo(({
  handleBlur, to, title, children,
}) => (
  <Link
    to={to}
    title={title}
    className={({ isActive }) => (isActive ? 'nav__link mx-auto active' : 'nav__link mx-auto')}
    onBlur={handleBlur}
    data-nav
  >
    {({ isActive }) => (
      <>
        {children}
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
  handleBlur: func,
};

NavLink.defaultProps = {
  handleBlur: () => {},
};

export default NavLink;
