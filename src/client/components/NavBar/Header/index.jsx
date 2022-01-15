import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import Nav from '@client/components/NavBar/Nav';
import Logo from '@client/components/Logo';

const Header = memo(() => (
  <header className="header">
    <Link to="/" className="header__logo" title="Strona główna">
      <Logo />
    </Link>
    <Nav />
  </header>
));

Header.displayName = 'Header';

export default Header;
