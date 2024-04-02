import { memo, useRef, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useUser } from '@client/store/user';
import { usePageSizeContext } from '@client/contexts/PageSizeContext';
import { useNav } from '@client/views/Webpage/components/Header/components/NavBar/Nav/hooks';
import { lazyLoad } from '@client/utils/lazyLoadUtils';
import { testsConstants, routesConstants } from '@shared/constants';
import OverlayScrollbars from '@client/components/OverlayScrollbars';
import Hamburger from '@client/views/Webpage/components/Header/components/NavBar/Hamburger';
import NavLink from '@client/views/Webpage/components/Header/components/NavBar/NavLink';
import Link from '@client/router/components/Link';
import Heading from '@client/components/Typography/Heading';
import Box from '@client/components/Box';
import List from '@client/components/Lists/List';
import ListItem from '@client/components/Lists/ListItem';
import {
  getNavClassName,
  getDivClassName,
  getNavItemClassName,
  getNavListClassName,
} from './Nav.classes';

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
  const { isDesktop } = usePageSizeContext();
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

  const navItemClassName = useMemo(() => getNavItemClassName({ user: !!user }), [user]);

  const navListClassName = useMemo(() => getNavListClassName({
    isOpen,
    display: !isAnimated && !isOpen && !isDesktop && !isVisible,
  }), [isOpen, isDesktop, isAnimated, isVisible]);

  const navClassName = useMemo(() => getNavClassName({ isAnimated }), [isAnimated]);

  const divClassName = useMemo(() => getDivClassName({ user: !!user }), [user]);

  return (
    <Box
      as="nav"
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
      <Box className={navListClassName}>
        <Box className="nav__list-max-height">
          {!isDesktop && (
            <Box className={divClassName}>
              {isOpen && (
                <Hamburger
                  ref={closeNavButtonRef}
                  className="open order-1 order-lg-0"
                  attr
                  isExpanded={isOpen}
                  title={t(`${PATH}.menu.CLOSE_MENU`)}
                  text={t(`${PATH}.menu.CLOSE_MENU`)}
                  onClick={handleCloseNav}
                  onBlur={handleCloseNavOnBlur}
                />
              )}
              {user && (
                <Box className="order-0 order-lg-1 d-lg-none">
                  <NavImageLink
                    className="d-block p-1"
                    onBlur={handleCloseNavOnBlur}
                    gender={user?.gender}
                    type={user?.role?.type}
                    src={user?.image_url}
                  />
                </Box>
              )}
            </Box>
          )}
          <OverlayScrollbars>
            <List
              id="nav"
              className="nav__list nav__list-container pt-4 pt-lg-0"
            >
              <>
                {!isDesktop && (
                  <ListItem className="nav__item text-center mb-3 mb-lg-0 d-lg-none">
                    <NavLink
                      to={routesConstants.ROOT}
                      title={t(`${PATH}.nav.homepage.TITLE`)}
                      dataNav="true"
                      onBlur={handleCloseNavOnBlur}
                    >
                      {t(`${PATH}.nav.homepage.LINK`)}
                    </NavLink>
                  </ListItem>
                )}
              </>
              <ListItem className="nav__item text-center mb-3 mb-lg-0">
                <NavLink
                  to={routesConstants.POSTS.ROOT}
                  title={t(`${PATH}.nav.posts.TITLE`)}
                  dataNav="true"
                  onBlur={handleCloseNavOnBlur}
                >
                  {t(`${PATH}.nav.posts.LINK`)}
                </NavLink>
              </ListItem>
              <ListItem className="nav__item text-center mb-3 mb-lg-0">
                <NavLink
                  to={routesConstants.ABOUT.ROOT}
                  title={t(`${PATH}.nav.about.TITLE`)}
                  dataNav="true"
                  onBlur={handleCloseNavOnBlur}
                >
                  {t(`${PATH}.nav.about.LINK`)}
                </NavLink>
              </ListItem>
              <ListItem className="nav__item text-center mb-3 mb-lg-0">
                <NavLink
                  to={routesConstants.FAQS.ROOT}
                  title={t(`${PATH}.nav.faq.TITLE`)}
                  dataNav="true"
                  onBlur={handleCloseNavOnBlur}
                >
                  {t(`${PATH}.nav.faq.LINK`)}
                </NavLink>
              </ListItem>
              <ListItem className="nav__item text-center mb-3 mb-lg-0">
                <NavLink
                  to={routesConstants.CONTACT.ROOT}
                  title={t(`${PATH}.nav.contact.TITLE`)}
                  dataNav="true"
                  onBlur={handleCloseNavOnBlur}
                >
                  {t(`${PATH}.nav.contact.LINK`)}
                </NavLink>
              </ListItem>
              <>
                {!user && (
                  <ListItem className={navItemClassName}>
                    <Link
                      to={routesConstants.AUTH.SIGN_IN.ROOT}
                      title={t(`${PATH}.nav.signIn.TITLE`)}
                      className="nav__link mx-auto"
                      data-nav="true"
                      onBlur={handleCloseNavOnBlur}
                    >
                      <Box
                        as="span"
                        className="nav__text"
                      >
                        {t(`${PATH}.nav.signIn.LINK`)}
                      </Box>
                    </Link>
                  </ListItem>
                )}
              </>
              <>
                {user && (
                  <ListItem className="nav__item text-center mb-3 mb-lg-0">
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
                        className="nav__link mx-auto d-lg-none"
                        data-nav="true"
                        onBlur={handleCloseNavOnBlur}
                      >
                        <Box
                          as="span"
                          className="nav__text"
                        >
                          {t(`${PATH}.nav.signOut.LINK`)}
                        </Box>
                      </Link>
                    )}
                  </ListItem>
                )}
              </>
            </List>
          </OverlayScrollbars>
        </Box>
      </Box>
    </Box>
  );
});

Nav.displayName = 'Nav';

export default Nav;
