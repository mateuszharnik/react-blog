import React, {
  memo, useCallback, useRef, useEffect, useState,
} from 'react';
import { useStoreState, useStoreActions } from 'easy-peasy';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import Hamburger from '@client/components/NavBar/Hamburger';
import NavLink from '@client/components/NavBar/NavLink';
import NavImageLink from '@client/components/NavBar/NavImageLink';
import MaxViewHeight from '@client/components/MaxViewHeight';

const timeout = 300;
const gender = 'female';

const createSetMedia = (setIsDesktop, closeNav) => (media) => {
  if (media.matches) closeNav();

  setIsDesktop(media.matches);
};

const Nav = memo(() => {
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 992);
  const openNavButtonRef = useRef(null);
  const closeNavButtonRef = useRef(null);
  const { isOpen } = useStoreState((store) => store.nav);
  const { toggleNav, closeNav } = useStoreActions((actions) => actions.nav);

  const handleCloseNavOnBlur = useCallback((e) => {
    if (!e.relatedTarget || isDesktop) return;

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
    const media = window.matchMedia('(min-width: 992px)');
    const setMedia = createSetMedia(setIsDesktop, closeNav);

    media.addEventListener('change', setMedia);

    return () => media.removeEventListener('change', setMedia);
  }, [setIsDesktop, closeNav]);

  return (
    <nav className="nav">
      <h2 className="visually-hidden">Nawigacja</h2>
      {!isDesktop && (
        <Hamburger ref={openNavButtonRef} title="Otwórz menu" handleClick={handleOpenNav} />
      )}
      <TransitionGroup component={null}>
        <CSSTransition
          key={isOpen || isDesktop}
          classNames={isOpen && !isDesktop ? 'slide-right-nav' : ''}
          timeout={timeout}
        >
          {isOpen || isDesktop ? (
            <div className="nav__list-wrapper" data-nav>
              <MaxViewHeight classNames="nav__list-container">
                {!isDesktop && (
                  <div className="d-flex justify-content-between align-items-center">
                    <Hamburger
                      attr
                      ref={closeNavButtonRef}
                      title="Zamknij menu"
                      classNames="open order-1 order-lg-0"
                      handleClick={handleCloseNav}
                      handleBlur={handleCloseNavOnBlur}
                    />
                    <NavImageLink
                      classNames="p-1 order-0 order-lg-1"
                      handleBlur={handleCloseNavOnBlur}
                      gender={gender}
                    />
                  </div>
                )}
                <ul className="nav__list pt-4 pt-lg-0" id="nav" data-nav>
                  {!isDesktop && (
                    <li className="nav__item text-center mb-3 mb-lg-0">
                      <NavLink
                        to="/"
                        title="Wróć do strony głównej"
                        handleBlur={handleCloseNavOnBlur}
                      >
                        Strona główna
                      </NavLink>
                    </li>
                  )}
                  <li className="nav__item text-center mb-3 mb-lg-0">
                    <NavLink
                      to="/posty"
                      title="Zobacz najnowsze wpisy"
                      handleBlur={handleCloseNavOnBlur}
                    >
                      Posty
                    </NavLink>
                  </li>
                  <li className="nav__item text-center mb-3 mb-lg-0">
                    <NavLink
                      to="/o-blogu"
                      title="Dowiedz się trochę o blogu"
                      handleBlur={handleCloseNavOnBlur}
                    >
                      O blogu
                    </NavLink>
                  </li>
                  <li className="nav__item text-center mb-3 mb-lg-0">
                    <NavLink
                      to="/najczesciej-zadawane-pytania"
                      title="Zobacz najczęściej zadawane pytania"
                      handleBlur={handleCloseNavOnBlur}
                    >
                      FAQs
                    </NavLink>
                  </li>
                  <li className="nav__item text-center mb-3 mb-lg-0">
                    <NavLink to="/kontakt" title="Skontaktuj się" handleBlur={handleCloseNavOnBlur}>
                      Kontakt
                    </NavLink>
                  </li>
                  {isDesktop && (
                    <li className="nav__item text-center mb-3 mb-lg-0">
                      <NavImageLink
                        classNames="nav__link mx-auto"
                        handleBlur={handleCloseNavOnBlur}
                        gender={gender}
                      />
                    </li>
                  )}
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
