import { memo, useRef, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from '@client/router/components';
import { useUser } from '@client/store/user';
import { useMatchMediaContext } from '@client/context/MatchMediaContext';
import { useNav } from '@client/views/Webpage/components/Header/components/NavBar/Nav/hooks';
import { lazyLoad } from '@client/utils/lazyLoadUtils';
import { testsConstants, routesConstants } from '@shared/constants';
import OverlayScrollbars from '@client/components/OverlayScrollbars';
import Hamburger from '@client/views/Webpage/components/Header/components/NavBar/Hamburger';
import NavLink from '@client/views/Webpage/components/Header/components/NavBar/NavLink';
import Heading from '@client/components/Heading';

const NavImageLink = lazyLoad({
  loader: () => import(/* webpackChunkName: 'nav-image-link' */ '@client/views/Webpage/components/Header/components/NavBar/NavImageLink'),
  loading: null,
  error: null,
});

const NavImageButton = lazyLoad({
  loader: () => import(/* webpackChunkName: 'nav-image-button' */ '@client/views/Webpage/components/Header/components/NavBar/NavImageButton'),
  loading: null,
  error: null,
});

const PATH = 'navigation';

const Nav = memo(() => {
  const openNavButtonRef = useRef(null);
  const closeNavButtonRef = useRef(null);

  const { t } = useTranslation();
  const { user } = useUser();
  const { isDesktop } = useMatchMediaContext();
  const {
    isOpen,
    isAnimated,
    isVisible,
    actions: {
      handleOpenNav,
      handleCloseNav,
      handleCloseNavOnBlur,
    },
  } = useNav({ openNavButtonRef, closeNavButtonRef });

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
    () => `nav__list-container d-flex align-items-center${
      user ? ' justify-content-between' : ' justify-content-end'
    }`,
    [user],
  );

  return (
    <nav
      data-testid={testsConstants.PAGE_NAV}
      className={navClassName}
    >
      <Heading
        as="h2"
        className="visually-hidden"
      >
        {t(`${PATH}.NAVIGATION`)}
      </Heading>
      {!isDesktop && !isOpen && (
        <Hamburger
          ref={openNavButtonRef}
          title={t(`${PATH}.menu.OPEN_MENU`)}
          text={t(`${PATH}.menu.OPEN_MENU`)}
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
                  title={t(`${PATH}.menu.CLOSE_MENU`)}
                  text={t(`${PATH}.menu.CLOSE_MENU`)}
                  hamburgerClassName="open order-1 order-lg-0"
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
                    src={user?.image_url}
                  />
                </div>
              )}
            </div>
          )}
          <OverlayScrollbars>
            <ul
              id="nav"
              className="nav__list nav__list-container pt-4 pt-lg-0"
            >
              <>
                {!isDesktop && (
                  <li className="nav__item text-center mb-3 mb-lg-0">
                    <NavLink
                      to={routesConstants.ROOT}
                      title={t(`${PATH}.nav.homepage.TITLE`)}
                      dataNav="true"
                      onBlur={handleCloseNavOnBlur}
                    >
                      {t(`${PATH}.nav.homepage.LINK`)}
                    </NavLink>
                  </li>
                )}
              </>
              <li className="nav__item text-center mb-3 mb-lg-0">
                <NavLink
                  to={routesConstants.POSTS.ROOT}
                  title={t(`${PATH}.nav.posts.TITLE`)}
                  dataNav="true"
                  onBlur={handleCloseNavOnBlur}
                >
                  {t(`${PATH}.nav.posts.LINK`)}
                </NavLink>
              </li>
              <li className="nav__item text-center mb-3 mb-lg-0">
                <NavLink
                  to={routesConstants.ABOUT.ROOT}
                  title={t(`${PATH}.nav.about.TITLE`)}
                  dataNav="true"
                  onBlur={handleCloseNavOnBlur}
                >
                  {t(`${PATH}.nav.about.LINK`)}
                </NavLink>
              </li>
              <li className="nav__item text-center mb-3 mb-lg-0">
                <NavLink
                  to={routesConstants.FAQS.ROOT}
                  title={t(`${PATH}.nav.faq.TITLE`)}
                  dataNav="true"
                  onBlur={handleCloseNavOnBlur}
                >
                  {t(`${PATH}.nav.faq.LINK`)}
                </NavLink>
              </li>
              <li className="nav__item text-center mb-3 mb-lg-0">
                <NavLink
                  to={routesConstants.CONTACT.ROOT}
                  title={t(`${PATH}.nav.contact.TITLE`)}
                  dataNav="true"
                  onBlur={handleCloseNavOnBlur}
                >
                  {t(`${PATH}.nav.contact.LINK`)}
                </NavLink>
              </li>
              <>
                {!user && (
                  <li className={navItemClassName}>
                    <Link
                      to={routesConstants.AUTH.SIGN_IN.ROOT}
                      title={t(`${PATH}.nav.signIn.TITLE`)}
                      className="nav__link mx-auto"
                      data-nav="true"
                      onBlur={handleCloseNavOnBlur}
                    >
                      <span className="nav__text">
                        {t(`${PATH}.nav.signIn.LINK`)}
                      </span>
                    </Link>
                  </li>
                )}
              </>
              <>
                {user && (
                  <li className="nav__item text-center mb-3 mb-lg-0">
                    {isDesktop ? (
                      <NavImageButton
                        gender={user?.gender}
                        type={user?.role?.type}
                        src={user?.image_url}
                        className="nav__link nav__link-button mx-auto overflow-hidden"
                      />
                    ) : (
                      <Link
                        to={routesConstants.AUTH.SIGN_OUT.ROOT}
                        title={t(`${PATH}.nav.signOut.TITLE`)}
                        className="nav__link mx-auto"
                        data-nav="true"
                        onBlur={handleCloseNavOnBlur}
                      >
                        <span className="nav__text">
                          {t(`${PATH}.nav.signOut.LINK`)}
                        </span>
                      </Link>
                    )}
                  </li>
                )}
              </>
            </ul>
          </OverlayScrollbars>
        </div>
      </div>
    </nav>
  );
});

Nav.displayName = 'Nav';

export default Nav;
