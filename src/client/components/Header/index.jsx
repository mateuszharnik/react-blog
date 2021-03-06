import React, { memo } from 'react';
import { NavLink } from 'react-router-dom';
import Nav from '@client/components/NavBar/Nav';
import Logo from '@client/components/Logo';

const Header = memo(() => (
  <div className="header__container w-100">
    <header className="header mx-auto">
      <NavLink
        to="/"
        end
        className="header__logo"
        title="Strona główna"
      >
        {({ isActive }) => (
          <>
            <span className="visually-hidden">
              Strona główna {isActive && '(Jesteś tutaj)'}
            </span>{' '}
            <Logo />
          </>
        )}
      </NavLink>
      <Nav />
    </header>
  </div>
));

Header.displayName = 'Header';

export default Header;
