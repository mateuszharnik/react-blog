import React, {
  memo, useMemo, useCallback, useRef, useEffect,
} from 'react';
import { useLocation } from 'react-router-dom';
import { useStoreState, useStoreActions } from 'easy-peasy';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserAlt } from '@fortawesome/free-solid-svg-icons/faUserAlt';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons/faSignOutAlt';
import { faCog } from '@fortawesome/free-solid-svg-icons/faCog';
import { string } from 'prop-types';
import LazyImage from '@client/components/LazyImage';
import NavLink from '@client/components/NavBar/NavLink';
import female from '@client/assets/images/undraw_female_avatar_w3jk.svg';
import male from '@client/assets/images/undraw_male_avatar_323b.svg';

const NavImageButton = memo(({ src, gender, className }) => {
  const buttonRef = useRef(null);
  const { pathname } = useLocation();
  const { isDesktop } = useStoreState((store) => store.matchMedia);
  const { isOpen, isAnimated } = useStoreState((store) => store.navDropdown);
  const { toggleNav } = useStoreActions((actions) => actions.navDropdown);

  const image = useMemo(() => {
    if (src) return src;

    return gender === 'female' ? female : male;
  }, [src, gender]);

  const setFocus = useCallback(() => {
    setTimeout(() => {
      const element = buttonRef.current;

      if (element) element.focus();
    }, 200);
  }, [buttonRef]);

  const handleToggleNav = useCallback(() => {
    toggleNav();

    setFocus();
  }, [setFocus]);

  const handleCloseNavOnBlur = useCallback((e) => {
    if (!e?.relatedTarget) return;

    if (!e?.relatedTarget?.getAttribute('data-dropdown-nav') && isOpen) toggleNav(false);
  }, [isOpen]);

  const closeNavOnClick = useCallback((e) => {
    if (!e?.target?.getAttribute('data-dropdown-nav') && isOpen) toggleNav(false);
  }, [isOpen]);

  useEffect(() => {
    document.addEventListener('click', closeNavOnClick);

    return () => document.removeEventListener('click', closeNavOnClick);
  }, [closeNavOnClick]);

  useEffect(() => () => toggleNav(false), [pathname, isDesktop]);

  return (
    <div className="nav__link-image-wrapper">
      <button
        type="button"
        ref={buttonRef}
        className={className}
        title={isOpen ? 'Zamknij menu' : 'Otwórz menu'}
        disabled={isAnimated}
        data-dropdown-nav="true"
        onClick={handleToggleNav}
        onBlur={handleCloseNavOnBlur}
      >
        <span className="visually-hidden">Menu</span>
        <LazyImage
          divClassName="nav__link-image"
          width={36}
          height={36}
          alt="Zdjęcie użytkownika"
          src={image}
        />
      </button>
      <TransitionGroup component={null}>
        <CSSTransition
          appear
          key={isOpen}
          classNames="dropdown-fade"
          timeout={150}
        >
          <>
            {isOpen && (
              <div
                className="dropdown-nav"
                data-dropdown-nav="true"
              >
                <ul
                  className="dropdown-nav__list py-2"
                  data-dropdown-nav="true"
                >
                  <li className="dropdown-nav__item">
                    <NavLink
                      to="/profil"
                      title="Wyświetl swój profil"
                      dataDropdownNav="true"
                      onBlur={handleCloseNavOnBlur}
                    >
                      <FontAwesomeIcon
                        icon={faUserAlt}
                        fixedWidth
                      />{' '}
                      <span className="ms-2">Profil</span>
                    </NavLink>
                  </li>
                  <li className="dropdown-nav__item">
                    <NavLink
                      to="/profil/ustawienia"
                      title="Ustawienia konta"
                      dataDropdownNav="true"
                      onBlur={handleCloseNavOnBlur}
                    >
                      <FontAwesomeIcon
                        icon={faCog}
                        fixedWidth
                      />{' '}
                      <span className="ms-2">Ustawienia</span>
                    </NavLink>
                  </li>
                  <li className="dropdown-nav__item">
                    <NavLink
                      to="/zaloguj"
                      title="Wyloguj się"
                      dataDropdownNav="true"
                      onBlur={handleCloseNavOnBlur}
                    >
                      <FontAwesomeIcon
                        icon={faSignOutAlt}
                        fixedWidth
                      />{' '}
                      <span className="ms-2">Wyloguj</span>
                    </NavLink>
                  </li>
                </ul>
              </div>
            )}
          </>
        </CSSTransition>
      </TransitionGroup>
    </div>
  );
});

NavImageButton.displayName = 'NavImageButton';

NavImageButton.propTypes = {
  gender: string.isRequired,
  className: string.isRequired,
  src: string,
};

NavImageButton.defaultProps = {
  src: '',
};

export default NavImageButton;
