import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { testsConstants, routesConstants } from '@shared/constants';
import I18nextProvider from '@client/providers/i18nextProvider';
import StoreProvider from '@client/providers/storeProvider';
import MatchMediaContext from '@client/contexts/MatchMediaContext';
import Header from './index';

describe('Header', () => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  });

  it('should render Header component', async () => {
    render(
      <StoreProvider>
        <MemoryRouter
          basename={process.env.BASE_URL}
          initialEntries={[routesConstants.ABOUT.ROOT]}
        >
          <I18nextProvider>
            <MatchMediaContext>
              <Header />
            </MatchMediaContext>
          </I18nextProvider>
        </MemoryRouter>
      </StoreProvider>,
    );

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
    render(
      <StoreProvider>
        <MemoryRouter
          basename={process.env.BASE_URL}
          initialEntries={[routesConstants.ROOT]}
        >
          <I18nextProvider>
            <MatchMediaContext>
              <Header />
            </MatchMediaContext>
          </I18nextProvider>
        </MemoryRouter>
      </StoreProvider>,
    );

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
