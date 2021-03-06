import React, {
  memo, useMemo, useCallback, useRef, useEffect,
} from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { useStoreState, useStoreActions } from 'easy-peasy';
import { string } from 'prop-types';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserAlt } from '@fortawesome/free-solid-svg-icons/faUserAlt';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons/faSignOutAlt';
import { faCog } from '@fortawesome/free-solid-svg-icons/faCog';
import LazyImage from '@client/components/LazyImage';
import NavLink from '@client/components/NavBar/NavLink';
import female from '@client/assets/images/undraw_female_avatar_w3jk.svg';
import male from '@client/assets/images/undraw_male_avatar_323b.svg';

const NavImageButton = memo(({
  src, type, gender, className,
}) => {
  const buttonRef = useRef(null);
  const { pathname } = useLocation();
  const { isDesktop } = useStoreState((store) => store.matchMedia);
  const { isOpen, isAnimated } = useStoreState((store) => store.navDropdown);
  const { toggleNav } = useStoreActions((actions) => actions.navDropdown);
  const { signOut } = useStoreActions((actions) => actions.auth);
  const navigate = useNavigate();

  const image = useMemo(() => {
    if (src) return src;

    return gender === 'kobieta' ? female : male;
  }, [src, gender]);

  const to = useMemo(() => (type === 'USER' ? '/profil' : '/admin'), [type]);

  const isAdmin = useMemo(() => type !== 'USER', [type]);

  const setFocus = useCallback(() => {
    setTimeout(() => {
      const element = buttonRef.current;

      if (element) element.focus();
    }, 200);
  }, [buttonRef]);

  const handleSignOut = useCallback(async (e) => {
    e.preventDefault();

    await signOut();

    navigate('/zaloguj');
  }, []);

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
        title={isOpen ? 'Zamknij menu' : 'Otw??rz menu'}
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
          alt="Zdj??cie u??ytkownika"
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
                      to={to}
                      title="Wy??wietl sw??j profil"
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
                  {!isAdmin && (
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
                  )}
                  <li className="dropdown-nav__item">
                    <Link
                      className="nav__link mx-auto"
                      to="/zaloguj"
                      title="Wyloguj si??"
                      data-dropdown-nav="true"
                      onClick={handleSignOut}
                      onBlur={handleCloseNavOnBlur}
                    >
                      <span className="nav__text">
                        <FontAwesomeIcon
                          icon={faSignOutAlt}
                          fixedWidth
                        />{' '}
                        <span className="ms-2">Wyloguj</span>
                      </span>
                    </Link>
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
  type: string.isRequired,
  gender: string.isRequired,
  className: string.isRequired,
  src: string,
};

NavImageButton.defaultProps = {
  src: '',
};

export default NavImageButton;
