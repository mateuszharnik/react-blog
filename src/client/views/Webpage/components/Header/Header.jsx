import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { testsConstants, routesConstants } from '@shared/constants';
import Nav from '@client/views/Webpage/components/Header/components/NavBar/Nav';
import ExactActiveLink from '@client/router/components/ExactActiveLink';
import Logo from '@client/components/Images/Logo';
import Box from '@client/components/Box';

const PATH = 'navigation';

const Header = memo((props) => {
  const { t } = useTranslation();

  return (
    <Box
      className="header__container w-100"
      {...props}
    >
      <Box
        as="header"
        className="header mx-auto"
      >
        <ExactActiveLink
          id="homepage"
          title={t(`${PATH}.nav.homepage.LINK`)}
          data-testid={testsConstants.HEADER_NAV_LINK}
          to={routesConstants.ROOT}
          className="header__logo"
        >
          <Box
            as="span"
            data-testid={testsConstants.HEADER_NAV_LINK_TEXT}
            className="visually-hidden"
          >
            {t(`${PATH}.nav.homepage.LINK`)}
            {' '}
          </Box>
          <Logo />
        </ExactActiveLink>
        <Nav />
      </Box>
    </Box>
  );
});

Header.displayName = 'Header';

export default Header;
