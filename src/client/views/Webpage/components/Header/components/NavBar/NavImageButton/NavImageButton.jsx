import { memo, useMemo, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserAlt } from '@fortawesome/free-solid-svg-icons/faUserAlt';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons/faSignOutAlt';
import { faCog } from '@fortawesome/free-solid-svg-icons/faCog';
import { Link } from '@client/router/components';
import { useDropdownNav } from '@client/views/Webpage/components/Header/components/NavBar/NavImageButton/hooks';
import { navImageButtonPropTypes, navImageButtonDefaultProps } from '@client/prop-types';
import { routesConstants, rolesConstants, valuesConstants } from '@shared/constants';
import female from '@client/assets/images/undraw_female_avatar_w3jk.svg';
import male from '@client/assets/images/undraw_male_avatar_323b.svg';
import LazyImage from '@client/components/LazyImage';
import NavLink from '@client/views/Webpage/components/Header/components/NavBar/NavLink';

const PATH = 'navigation';

const NavImageButton = memo(({
  src,
  type,
  gender,
  ...restProps
}) => {
  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);

  const { t } = useTranslation();
  const {
    isOpen, isAnimated,
    actions: { handleToggleNav, handleCloseNavOnBlur },
  } = useDropdownNav({ buttonRef, dropdownRef });

  const image = useMemo(() => {
    if (src) return src;

    return gender === valuesConstants.GENDER.FEMALE ? female : male;
  }, [src, gender]);

  const to = useMemo(() => (
    type === rolesConstants.USER
      ? routesConstants.PROFILE.DASHBOARD.ROOT
      : routesConstants.ADMIN.ROOT
  ), [type]);

  const title = useMemo(() => `${PATH}.menu.${isOpen ? 'CLOSE_MENU' : 'OPEN_MENU'}`, [isOpen]);

  const isAdmin = useMemo(() => type !== rolesConstants.USER, [type]);

  return (
    <div className="nav__link-image-wrapper">
      <button
        ref={buttonRef}
        type="button"
        title={t(title)}
        disabled={isAnimated}
        data-dropdown-nav="true"
        {...restProps}
        onClick={handleToggleNav}
        onBlur={handleCloseNavOnBlur}
      >
        <span className="visually-hidden">
          {t(`${PATH}.menu.MENU`)}
        </span>
        <LazyImage
          divClassName="nav__link-image"
          imgClassName="rounded-circle"
          width={36}
          height={36}
          alt={t(`${PATH}.USER_IMAGE`)}
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
                ref={dropdownRef}
              >
                <ul
                  className="dropdown-nav__list py-2"
                  data-dropdown-nav="true"
                >
                  <li className="dropdown-nav__item">
                    <NavLink
                      to={to}
                      title={t(`${PATH}.nav.profile.TITLE`)}
                      dataDropdownNav="true"
                      onBlur={handleCloseNavOnBlur}
                    >
                      <FontAwesomeIcon
                        icon={faUserAlt}
                        fixedWidth
                      />
                      <span className="ms-2">
                        {' '}
                        {t(`${PATH}.nav.profile.LINK`)}
                      </span>
                    </NavLink>
                  </li>
                  {!isAdmin && (
                    <li className="dropdown-nav__item">
                      <NavLink
                        to={routesConstants.PROFILE.SETTINGS.ROOT}
                        title={t(`${PATH}.nav.settings.TITLE`)}
                        dataDropdownNav="true"
                        onBlur={handleCloseNavOnBlur}
                      >
                        <FontAwesomeIcon
                          icon={faCog}
                          fixedWidth
                        />
                        <span className="ms-2">
                          {' '}
                          {t(`${PATH}.nav.settings.LINK`)}
                        </span>
                      </NavLink>
                    </li>
                  )}
                  <li className="dropdown-nav__item">
                    <Link
                      to={routesConstants.AUTH.SIGN_OUT.ROOT}
                      title={t(`${PATH}.nav.signOut.TITLE`)}
                      className="nav__link mx-auto"
                      data-dropdown-nav="true"
                      onBlur={handleCloseNavOnBlur}
                    >
                      <span className="nav__text">
                        <FontAwesomeIcon
                          icon={faSignOutAlt}
                          fixedWidth
                        />
                        <span className="ms-2">
                          {' '}
                          {t(`${PATH}.nav.signOut.LINK`)}
                        </span>
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

NavImageButton.propTypes = navImageButtonPropTypes;

NavImageButton.defaultProps = navImageButtonDefaultProps;

export default NavImageButton;
