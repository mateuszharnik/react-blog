import { render, screen, createWrapperComponent } from '@client/utils/testUtils';
import { testsConstants, routesConstants } from '@shared/constants';
import WebpageNavigationContext from '@client/views/Webpage/contexts/WebpageNavigationContext';
import Header from './index';

const wrapper = createWrapperComponent(({ children }) => (
  <WebpageNavigationContext>
    {children}
  </WebpageNavigationContext>
));

describe('Header', () => {
  it('should render Header component', async () => {
    await render(Header, {
      routerPath: routesConstants.ABOUT.ROOT,
      wrapper,
    });

    const headerNavLinkEl = screen.getByTestId(testsConstants.HEADER_NAV_LINK);
    const headerNavLinkTextEl = screen.getByTestId(testsConstants.HEADER_NAV_LINK_TEXT);
    const headerNavLinkTextHelperEl = screen.queryByTestId(`${testsConstants.NAV_LINK_TEXT_HELPER}-homepage`);
    const pageLogoEl = screen.getByTestId(testsConstants.PAGE_LOGO);
    const pageNavEl = screen.getByTestId(testsConstants.PAGE_NAV);

    expect(headerNavLinkEl).toBeInTheDocument();
    expect(headerNavLinkEl).toHaveClass('header__logo', { exact: true });
    expect(headerNavLinkEl).toHaveAttribute('title', 'Strona główna');
    expect(headerNavLinkEl).toHaveAttribute('href', routesConstants.ROOT);

    expect(headerNavLinkTextEl).toBeInTheDocument();
    expect(headerNavLinkTextEl).toHaveTextContent('Strona główna');

    expect(headerNavLinkTextHelperEl).not.toBeInTheDocument();
    expect(pageLogoEl).toBeInTheDocument();
    expect(pageNavEl).toBeInTheDocument();
  });

  it('should render Header component with helper text if user is on the home page', async () => {
    await render(Header, {
      routerPath: routesConstants.ROOT,
      wrapper,
    });

    const headerNavLinkEl = screen.getByTestId(testsConstants.HEADER_NAV_LINK);
    const headerNavLinkTextEl = screen.getByTestId(testsConstants.HEADER_NAV_LINK_TEXT);
    const headerNavLinkTextHelperEl = screen.getByTestId(`${testsConstants.NAV_LINK_TEXT_HELPER}-homepage`);
    const pageLogoEl = screen.getByTestId(testsConstants.PAGE_LOGO);
    const pageNavEl = screen.getByTestId(testsConstants.PAGE_NAV);

    expect(headerNavLinkEl).toBeInTheDocument();
    expect(headerNavLinkEl).toHaveClass('header__logo active', { exact: true });
    expect(headerNavLinkEl).toHaveAttribute('aria-current', 'page');
    expect(headerNavLinkEl).toHaveAttribute('title', 'Strona główna');
    expect(headerNavLinkEl).toHaveAttribute('href', routesConstants.ROOT);

    expect(headerNavLinkTextEl).toBeInTheDocument();
    expect(headerNavLinkTextEl).toHaveTextContent('Strona główna');

    expect(headerNavLinkTextHelperEl).toBeInTheDocument();
    expect(headerNavLinkTextHelperEl).toHaveTextContent('(Jesteś tutaj)');

    expect(pageLogoEl).toBeInTheDocument();
    expect(pageNavEl).toBeInTheDocument();
  });
});
