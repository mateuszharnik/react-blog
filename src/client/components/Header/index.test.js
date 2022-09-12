import React from 'react';
import { StoreProvider } from 'easy-peasy';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import testIds from '@shared/testIds';
import store from '@client/store/index.store';
import Header from './index';

describe('Header', () => {
  it('should render Header component', async () => {
    render(
      <StoreProvider store={store}>
        <MemoryRouter
          basename="/"
          initialEntries={['/o-blogu']}
        >
          <Header />
        </MemoryRouter>
      </StoreProvider>,
    );

    const headerNavLinkEl = screen.getByTestId(testIds.HeaderNavLink);
    const headerNavLinkTextEl = screen.getByTestId(testIds.HeaderNavLinkText);
    const pageLogoEl = screen.getByTestId(testIds.PageLogo);
    const pageNavEl = screen.getByTestId(testIds.PageNav);

    expect(headerNavLinkEl).toBeInTheDocument();
    expect(headerNavLinkEl).toHaveClass('header__logo', { exact: true });
    expect(headerNavLinkEl).toHaveAttribute('title', 'Strona główna');
    expect(headerNavLinkEl).toHaveAttribute('href', '/');

    expect(headerNavLinkTextEl).toBeInTheDocument();
    expect(headerNavLinkTextEl).toHaveTextContent('Strona główna');

    expect(pageLogoEl).toBeInTheDocument();
    expect(pageNavEl).toBeInTheDocument();
  });

  it('should render Header component with helper text if user is on the home page', async () => {
    render(
      <StoreProvider store={store}>
        <MemoryRouter
          basename="/"
          initialEntries={['/']}
        >
          <Header />
        </MemoryRouter>
      </StoreProvider>,
    );

    const headerNavLinkEl = screen.getByTestId(testIds.HeaderNavLink);
    const headerNavLinkTextEl = screen.getByTestId(testIds.HeaderNavLinkText);
    const pageLogoEl = screen.getByTestId(testIds.PageLogo);
    const pageNavEl = screen.getByTestId(testIds.PageNav);

    expect(headerNavLinkEl).toBeInTheDocument();
    expect(headerNavLinkEl).toHaveClass('header__logo active', { exact: true });
    expect(headerNavLinkEl).toHaveAttribute('aria-current', 'page');
    expect(headerNavLinkEl).toHaveAttribute('title', 'Strona główna');
    expect(headerNavLinkEl).toHaveAttribute('href', '/');

    expect(headerNavLinkTextEl).toBeInTheDocument();
    expect(headerNavLinkTextEl).toHaveTextContent('Strona główna (Jesteś tutaj)');

    expect(pageLogoEl).toBeInTheDocument();
    expect(pageNavEl).toBeInTheDocument();
  });
});
