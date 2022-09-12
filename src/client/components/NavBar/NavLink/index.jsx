import React, { memo } from 'react';
import { NavLink as Link } from 'react-router-dom';
import {
  oneOfType, arrayOf, node, string, func,
} from 'prop-types';
import testIds from '@shared/testIds';

const NavLink = memo(({
  onBlur, to, title, children, dataNav, dataDropdownNav, id,
}) => (
  <Link
    data-testid={`${testIds.NavLink}${id ? `-${id}` : ''}`}
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
        <span
          data-testid={`${testIds.NavLinkText}${id ? `-${id}` : ''}`}
          className="nav__text"
        >
          {children}
        </span>{' '}
        {isActive && (
          <span
            data-testid={`${testIds.NavLinkTextHelper}${id ? `-${id}` : ''}`}
            className="visually-hidden"
          >
            (Jesteś tutaj)
          </span>
        )}
      </>
    )}
  </Link>
));

NavLink.displayName = 'NavLink';

NavLink.propTypes = {
  children: oneOfType([arrayOf(node), node]),
  title: string.isRequired,
  to: string.isRequired,
  onBlur: func,
  id: string,
  dataNav: string,
  dataDropdownNav: string,
};

NavLink.defaultProps = {
  onBlur: () => {},
  id: '',
  children: null,
  dataNav: null,
  dataDropdownNav: null,
};

export default NavLink;
