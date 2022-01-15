import React, { memo, useCallback, useRef } from 'react';
import { useStoreState, useStoreActions } from 'easy-peasy';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import Hamburger from '@client/components/NavBar/Hamburger';
import NavLink from '@client/components/NavBar/NavLink';
import MaxViewHeight from '@client/components/MaxViewHeight';

const timeout = 300;

const Nav = memo(() => {
  const openNavButtonRef = useRef(null);
  const closeNavButtonRef = useRef(null);
  const { isOpen } = useStoreState((store) => store.nav);
  const { toggleNav } = useStoreActions((actions) => actions.nav);

  const handleCloseNavOnBlur = useCallback((e) => {
    if (!e?.relatedTarget.getAttribute('data-nav')) toggleNav(false);
  }, [toggleNav]);

  const setFocus = useCallback((navOpen = false) => {
    setTimeout(() => {
      const element = navOpen ? closeNavButtonRef.current : openNavButtonRef.current;

      if (element) element.focus();
    }, 0);
  }, [closeNavButtonRef, openNavButtonRef]);

  const handleCloseNav = useCallback(() => {
    toggleNav(false);

    setFocus(false);
  }, [toggleNav, setFocus]);

  const handleOpenNav = useCallback(() => {
    toggleNav(true);

    setFocus(true);
  }, [toggleNav, setFocus]);

  return (
    <nav className="nav">
      <Hamburger ref={openNavButtonRef} title="Otwórz menu" handleClick={handleOpenNav} />
      <TransitionGroup component={null}>
        <CSSTransition key={isOpen} classNames="slide-right-nav" timeout={timeout}>
          {isOpen ? (
            <div className="nav__list-wrapper">
              <MaxViewHeight classList="nav__list-container">
                <Hamburger
                  attr
                  ref={closeNavButtonRef}
                  title="Otwórz menu"
                  classList="open ms-auto"
                  handleClick={handleCloseNav}
                  handleBlur={handleCloseNavOnBlur}
                />
                <ul className="nav__list pt-4" id="nav">
                  <NavLink
                    to="/posty"
                    title="Zobacz najnowsze wpisy"
                    handleBlur={handleCloseNavOnBlur}
                  >
                    Posty
                  </NavLink>
                  <NavLink
                    to="/o-blogu"
                    title="Dowiedz się trochę o blogu"
                    handleBlur={handleCloseNavOnBlur}
                  >
                    O blogu
                  </NavLink>
                  <NavLink to="/kontakt" title="Skontaktuj się" handleBlur={handleCloseNavOnBlur}>
                    Kontakt
                  </NavLink>
                  <NavLink
                    to="/najczesciej-zadawane-pytania"
                    title="Zobacz najczęściej zadawane pytania"
                    handleBlur={handleCloseNavOnBlur}
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
