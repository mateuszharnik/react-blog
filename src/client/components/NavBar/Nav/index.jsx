import React, {
  memo, useCallback, useRef, useEffect, useMemo,
} from 'react';
import Loadable from 'react-loadable';
import { useStoreState, useStoreActions } from 'easy-peasy';
import Hamburger from '@client/components/NavBar/Hamburger';
import NavLink from '@client/components/NavBar/NavLink';
import MaxViewHeight from '@client/components/MaxViewHeight';

const NavImageLink = Loadable({
  loader: () => import(/* webpackChunkName: 'nav-image-link' */ '@client/components/NavBar/NavImageLink'),
  loading: () => null,
});

const user = true;
const gender = 'female';

const Nav = memo(() => {
  const openNavButtonRef = useRef(null);
  const closeNavButtonRef = useRef(null);
  const { isOpen, isAnimated } = useStoreState((store) => store.nav);
  const { isDesktop } = useStoreState((store) => store.matchMedia);
  const { toggleNav, closeNav } = useStoreActions((actions) => actions.nav);

  const navItemClassName = useMemo(
    () => `nav__item text-center mb-3 mb-lg-0${user ? '' : ' nav__link-image-wrapper'}`,
    [user],
  );

  const navListClassName = useMemo(
    () => `nav__list-wrapper${isOpen ? ' open' : ''}${isOpen || isDesktop ? ' visible' : ''}${
      !isAnimated && !isOpen && !isDesktop ? ' invisible' : ''
    }`,
    [isOpen, isDesktop, isAnimated],
  );

  const divClassName = useMemo(
    () => `d-flex align-items-center${user ? ' justify-content-between' : ' justify-content-end'}`,
    [user],
  );

  const handleCloseNavOnBlur = useCallback((e) => {
    if (!e?.relatedTarget || isDesktop) return;

    if (!e?.relatedTarget?.getAttribute('data-nav')) toggleNav(false);
  }, [toggleNav, isDesktop]);

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

  useEffect(() => {
    if (isDesktop) closeNav();
  }, [isDesktop, closeNav]);

  return (
    <nav className="nav">
      <h2 className="visually-hidden">Nawigacja</h2>
      {!isDesktop && !isOpen && (
        <Hamburger
          ref={openNavButtonRef}
          title="Otwórz menu"
          onClick={handleOpenNav}
          isExpanded={isOpen}
        />
      )}
      <div className={navListClassName}>
        <MaxViewHeight className="nav__list-container">
          {!isDesktop && (
            <div className={divClassName}>
              <Hamburger
                attr
                isExpanded={isOpen}
                ref={closeNavButtonRef}
                title="Zamknij menu"
                className="open order-1 order-lg-0"
                onClick={handleCloseNav}
                onBlur={handleCloseNavOnBlur}
              />
              {user && (
              <div className="order-0 order-lg-1">
                <NavImageLink
                  className="d-block p-1"
                  onBlur={handleCloseNavOnBlur}
                  gender={gender}
                />
              </div>
              )}
            </div>
          )}
          <ul className="nav__list pt-4 pt-lg-0" id="nav">
            {!isDesktop && (
              <li className="nav__item text-center mb-3 mb-lg-0">
                <NavLink to="/" title="Wróć do strony głównej" onBlur={handleCloseNavOnBlur}>
                  Strona główna
                </NavLink>
              </li>
            )}
            <li className="nav__item text-center mb-3 mb-lg-0">
              <NavLink
                to="/posty"
                title="Zobacz najnowsze wpisy"
                onBlur={handleCloseNavOnBlur}
              >
                Posty
              </NavLink>
            </li>
            <li className="nav__item text-center mb-3 mb-lg-0">
              <NavLink
                to="/o-blogu"
                title="Dowiedz się trochę o blogu"
                onBlur={handleCloseNavOnBlur}
              >
                O blogu
              </NavLink>
            </li>
            <li className="nav__item text-center mb-3 mb-lg-0">
              <NavLink
                to="/najczesciej-zadawane-pytania"
                title="Zobacz najczęściej zadawane pytania"
                onBlur={handleCloseNavOnBlur}
              >
                FAQ
              </NavLink>
            </li>
            <li className={navItemClassName}>
              <NavLink to="/kontakt" title="Skontaktuj się" onBlur={handleCloseNavOnBlur}>
                Kontakt
              </NavLink>
            </li>
            {isDesktop && user && (
              <li className="nav__item text-center mb-3 mb-lg-0">
                <NavImageLink
                  className="nav__link mx-auto"
                  onBlur={handleCloseNavOnBlur}
                  gender={gender}
                />
              </li>
            )}
          </ul>
        </MaxViewHeight>
      </div>
    </nav>
  );
});

Nav.displayName = 'Nav';

export default Nav;
