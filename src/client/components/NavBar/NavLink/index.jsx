import React, { memo } from 'react';
import { NavLink as Link } from 'react-router-dom';
import {
  oneOfType, arrayOf, node, string,
} from 'prop-types';

const NavLink = memo(({ to, title, children }) => (
  <li className="nav__item text-center mb-3">
    <Link
      to={to}
      title={title}
      className={({ isActive }) => (isActive ? 'nav__link mx-auto active' : 'nav__link mx-auto')}
    >
      {({ isActive }) => (
        <>
          {children}
          {isActive && <span className="visually-hidden">(Jesteś tutaj)</span>}
        </>
      )}
    </Link>
  </li>
));

NavLink.displayName = 'NavLink';

NavLink.propTypes = {
  children: oneOfType([arrayOf(node), node]).isRequired,
  title: string.isRequired,
  to: string.isRequired,
};

export default NavLink;
