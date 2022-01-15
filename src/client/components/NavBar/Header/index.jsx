import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import Nav from '@client/components/NavBar/Nav';
import Logo from '@client/components/Logo';

const Header = memo(() => (
  <div className="header__container">
    <header className="header mx-auto">
      <Link to="/" className="header__logo" title="Strona główna">
        <Logo />
      </Link>
      <Nav />
    </header>
  </div>
));

Header.displayName = 'Header';

export default Header;
