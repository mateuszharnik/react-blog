import React, {
  memo, useEffect, useState, useMemo,
} from 'react';
import { Link, useLocation } from 'react-router-dom';
import Nav from '@client/components/NavBar/Nav';
import Logo from '@client/components/Logo';

const Header = memo(() => {
  const { pathname } = useLocation();
  const [isHomePath, setIsHomePath] = useState(pathname === '/');

  const divClassName = useMemo(
    () => `header__container w-100${isHomePath ? '' : ' black'}`,
    [isHomePath],
  );

  useEffect(() => {
    setIsHomePath(pathname === '/');
  }, [pathname, setIsHomePath]);

  return (
    <div className={divClassName}>
      <header className="header mx-auto">
        <Link to="/" className="header__logo" title="Strona główna">
          <Logo />
        </Link>
        <Nav />
      </header>
    </div>
  );
});

Header.displayName = 'Header';

export default Header;
