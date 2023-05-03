import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { ActiveLink } from '@client/router/components';
import { testsConstants, routesConstants } from '@shared/constants';
import Nav from '@client/views/Webpage/components/Header/components/NavBar/Nav';
import Logo from '@client/components/Logo';

const PATH = 'navigation';

const Header = memo(() => {
  const { t } = useTranslation();

  return (
    <div className="header__container w-100">
      <header className="header mx-auto">
        <ActiveLink
          to={routesConstants.ROOT}
          end
          className="header__logo"
          title={t(`${PATH}.nav.homepage.LINK`)}
          data-testid={testsConstants.HEADER_NAV_LINK}
        >
          {({ isActive }) => (
            <>
              <span
                data-testid={testsConstants.HEADER_NAV_LINK_TEXT}
                className="visually-hidden"
              >
                {t(`${PATH}.nav.homepage.LINK`)}
                {' '}
                {isActive && (
                  <span>
                    {t(`${PATH}.YOU_ARE_HERE`)}
                  </span>
                )}
              </span>
              <Logo />
            </>
          )}
        </ActiveLink>
        <Nav />
      </header>
    </div>
  );
});

Header.displayName = 'Header';

export default Header;
