import React, { memo, useState } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import Hamburger from '@client/components/NavBar/Hamburger';
import NavLink from '@client/components/NavBar/NavLink';
import MaxViewHeight from '@client/components/MaxViewHeight';

const timeout = 300;

const Nav = memo(() => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggleMenu = () => {
    setIsOpen((state) => !state);
  };

  return (
    <nav className="nav">
      <Hamburger title="Otwórz menu" handleClick={handleToggleMenu} />
      <TransitionGroup component={null}>
        <CSSTransition key={isOpen} classNames="slide-right-nav" timeout={timeout}>
          {isOpen ? (
            <div className="nav__list-wrapper">
              <MaxViewHeight classList="nav__list-container">
                <Hamburger
                  title="Otwórz menu"
                  classList="open ms-auto"
                  handleClick={handleToggleMenu}
                />
                <ul className="nav__list pt-4">
                  <NavLink to="/posty" title="Zobacz najnowsze wpisy">
                    Posty
                  </NavLink>
                  <NavLink to="/o-blogu" title="Dowiedz się trochę o blogu">
                    O blogu
                  </NavLink>
                  <NavLink to="/kontakt" title="Skontaktuj się">
                    Kontakt
                  </NavLink>
                  <NavLink
                    to="/najczesciej-zadawane-pytania"
                    title="Zobacz najczęściej zadawane pytania"
                  >
                    Często zadawane pytania
                  </NavLink>
                </ul>
              </MaxViewHeight>
            </div>
          ) : (
            <></>
          )}
        </CSSTransition>
      </TransitionGroup>
    </nav>
  );
});

Nav.displayName = 'Nav';

export default Nav;
