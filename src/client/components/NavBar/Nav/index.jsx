import React, {
  memo, useCallback, useRef, useEffect, useMemo, useState,
} from 'react';
import { Link } from 'react-router-dom';
import { OverlayScrollbarsComponent } from 'overlayscrollbars-react';
import { useStoreState, useStoreActions } from 'easy-peasy';
import throttle from 'lodash/throttle';
import debounce from 'lodash/debounce';
import lazyLoad from '@client/helpers/lazyLoad';
import Hamburger from '@client/components/NavBar/Hamburger';
import NavLink from '@client/components/NavBar/NavLink';

const NavImageLink = lazyLoad({
  loader: () => import(/* webpackChunkName: 'nav-image-link' */ '@client/components/NavBar/NavImageLink'),
  loading: null,
  error: null,
});

const NavImageButton = lazyLoad({
  loader: () => import(/* webpackChunkName: 'nav-image-button' */ '@client/components/NavBar/NavImageButton'),
  loading: null,
  error: null,
});

const options = {
  className: 'os-theme-light',
  autoUpdate: true,
  scrollbars: {
    autoHideDelay: 300,
    visibility: 'auto',
    autoHide: 'never',
  },
  overflowBehavior: {
    x: 'hidden',
  },
};

const Nav = memo(() => {
  const openNavButtonRef = useRef(null);
  const closeNavButtonRef = useRef(null);
  const scrollbarRef = useRef(null);
  const { user } = useStoreState((store) => store.user);
  const { isOpen, isAnimated } = useStoreState((store) => store.nav);
  const { isDesktop } = useStoreState((store) => store.matchMedia);
  const { toggleNav, closeNav } = useStoreActions((actions) => actions.nav);
  const [isVisible, setIsVisible] = useState(isDesktop);

  const navItemClassName = useMemo(
    () => `nav__item text-center mb-3 mb-lg-0${user ? '' : ' nav__link-image-wrapper'}`,
    [user],
  );

  const navListClassName = useMemo(
    () => `nav__list-wrapper${isOpen ? ' open' : ''}${
      !isAnimated && !isOpen && !isDesktop && !isVisible ? ' d-none' : ''
    }`,
    [isOpen, isDesktop, isAnimated, isVisible],
  );

  const navClassName = useMemo(
    () => `nav${isAnimated ? ' nav--pointer-none' : ''}`,
    [isAnimated],
  );

  const divClassName = useMemo(
    () => `nav__list-container d-flex align-items-center${user ? ' justify-content-between' : ' justify-content-end'}`,
    [user],
  );

  const handleCloseNavOnBlur = useCallback((e) => {
    if (!e?.relatedTarget || isDesktop) return;

    if (!e?.relatedTarget?.getAttribute('data-nav') && isOpen) toggleNav(false);
  }, [isDesktop, isOpen]);

  const setFocus = useCallback((navOpen = false) => {
    setTimeout(() => {
      const element = navOpen ? closeNavButtonRef.current : openNavButtonRef.current;

      if (element) element.focus();
    }, 0);
  }, [closeNavButtonRef, openNavButtonRef]);

  const handleCloseNav = useCallback(() => {
    toggleNav(false);

    setFocus(false);
  }, [setFocus]);

  const handleOpenNav = useCallback(() => {
    setIsVisible(true);

    setTimeout(() => {
      toggleNav(true);

      setFocus(true);
      setIsVisible(false);
    }, 50);
  }, [setFocus]);

  const updateScrollbar = useCallback(() => {
    if (scrollbarRef?.current) {
      scrollbarRef?.current.osInstance().update();
    }
  }, [scrollbarRef]);

  useEffect(() => {
    if (isDesktop) closeNav();
  }, [isDesktop]);

  useEffect(() => {
    const throttledUpdateScrollbar = throttle(updateScrollbar, 50);
    const debouncedUpdateScrollbar = debounce(updateScrollbar, 50);

    window.addEventListener('resize', throttledUpdateScrollbar);
    window.addEventListener('resize', debouncedUpdateScrollbar);

    return () => {
      window.removeEventListener('resize', throttledUpdateScrollbar);
      window.removeEventListener('resize', debouncedUpdateScrollbar);
    };
  }, [updateScrollbar]);

  return (
    <nav className={navClassName}>
      <h2 className="visually-hidden">
        Nawigacja
      </h2>
      {!isDesktop && !isOpen && (
        <Hamburger
          ref={openNavButtonRef}
          title="Otw??rz menu"
          text="Otw??rz menu"
          onClick={handleOpenNav}
          isExpanded={isOpen}
        />
      )}
      <div className={navListClassName}>
        <div className="nav__list-max-height">
          {!isDesktop && (
            <div className={divClassName}>
              {isOpen && (
                <Hamburger
                  attr
                  isExpanded={isOpen}
                  ref={closeNavButtonRef}
                  title="Zamknij menu"
                  text="Zamknij menu"
                  className="open order-1 order-lg-0"
                  onClick={handleCloseNav}
                  onBlur={handleCloseNavOnBlur}
                />
              )}
              {user && (
                <div className="order-0 order-lg-1">
                  <NavImageLink
                    className="d-block p-1"
                    onBlur={handleCloseNavOnBlur}
                    gender={user?.gender}
                    type={user?.role?.type}
                  />
                </div>
              )}
            </div>
          )}
          <OverlayScrollbarsComponent
            ref={scrollbarRef}
            options={options}
          >
            <ul
              id="nav"
              className="nav__list nav__list-container pt-4 pt-lg-0"
            >
              <>
                {!isDesktop && (
                  <li className="nav__item text-center mb-3 mb-lg-0">
                    <NavLink
                      to="/"
                      title="Wr???? do strony g????wnej"
                      dataNav="true"
                      onBlur={handleCloseNavOnBlur}
                    >
                      Strona g????wna
                    </NavLink>
                  </li>
                )}
              </>
              <li className="nav__item text-center mb-3 mb-lg-0">
                <NavLink
                  to="/posty"
                  title="Zobacz najnowsze wpisy"
                  dataNav="true"
                  onBlur={handleCloseNavOnBlur}
                >
                  Posty
                </NavLink>
              </li>
              <li className="nav__item text-center mb-3 mb-lg-0">
                <NavLink
                  to="/o-blogu"
                  title="Dowiedz si?? troch?? o blogu i jego autorach"
                  dataNav="true"
                  onBlur={handleCloseNavOnBlur}
                >
                  O blogu
                </NavLink>
              </li>
              <li className="nav__item text-center mb-3 mb-lg-0">
                <NavLink
                  to="/najczesciej-zadawane-pytania"
                  title="Zobacz najcz????ciej zadawane pytania"
                  dataNav="true"
                  onBlur={handleCloseNavOnBlur}
                >
                  FAQ
                </NavLink>
              </li>
              <li className="nav__item text-center mb-3 mb-lg-0">
                <NavLink
                  to="/kontakt"
                  title="Skontaktuj si??"
                  dataNav="true"
                  onBlur={handleCloseNavOnBlur}
                >
                  Kontakt
                </NavLink>
              </li>
              <>
                {!user && (
                  <li className={navItemClassName}>
                    <Link
                      className="nav__link mx-auto"
                      to="/zaloguj"
                      title="Zaloguj si??"
                      data-nav="true"
                      onBlur={handleCloseNavOnBlur}
                    >
                      <span className="nav__text">
                        Zaloguj si??
                      </span>
                    </Link>
                  </li>
                )}
              </>
              <>
                {isDesktop && user && (
                  <li className="nav__item text-center mb-3 mb-lg-0">
                    <NavImageButton
                      className="nav__link nav__link-button mx-auto overflow-hidden"
                      gender={user?.gender}
                      type={user?.role?.type}
                    />
                  </li>
                )}
              </>
            </ul>
          </OverlayScrollbarsComponent>
        </div>
      </div>
    </nav>
  );
});

Nav.displayName = 'Nav';

export default Nav;
