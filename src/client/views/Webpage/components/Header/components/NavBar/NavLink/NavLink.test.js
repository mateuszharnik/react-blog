import { MemoryRouter } from 'react-router-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { testsConstants, routesConstants } from '@shared/constants';
import I18nextProvider from '@client/providers/i18nextProvider';
import NavLink from './index';

describe('NavLink', () => {
  it('should render NavLink component with required props', async () => {
    render(
      <MemoryRouter
        basename={process.env.BASE_URL}
        initialEntries={[routesConstants.ROOT]}
      >
        <I18nextProvider>
          <NavLink
            title="Title"
            to={routesConstants.ABOUT.ROOT}
          >
            Content
          </NavLink>
        </I18nextProvider>
      </MemoryRouter>,
    );

    const navLinkEl = screen.getByTestId(testsConstants.NAV_LINK);
    const navLinkTextEl = screen.getByTestId(testsConstants.NAV_LINK_TEXT);

    expect(navLinkEl).toBeInTheDocument();
    expect(navLinkEl).toHaveClass('nav__link mx-auto', { exact: true });
    expect(navLinkEl).toHaveAttribute('title', 'Title');
    expect(navLinkEl).toHaveAttribute('href', routesConstants.ABOUT.ROOT);

    expect(navLinkTextEl).toBeInTheDocument();
    expect(navLinkTextEl).toHaveTextContent('Content');
  });

  it('should render NavLink component with all props', async () => {
    const onBlur = jest.fn();
    const id = 'test';

    render(
      <MemoryRouter
        basename={process.env.BASE_URL}
        initialEntries={[routesConstants.ROOT]}
      >
        <I18nextProvider>
          <NavLink
            title="Title"
            to={routesConstants.ABOUT.ROOT}
            dataNav="dataNav"
            dataDropdownNav="dataDropdownNav"
            id={id}
            onBlur={onBlur}
          >
            Content
          </NavLink>
        </I18nextProvider>
      </MemoryRouter>,
    );

    const navLinkEl = screen.getByTestId(`${testsConstants.NAV_LINK}-${id}`);
    const navLinkTextEl = screen.getByTestId(`${testsConstants.NAV_LINK_TEXT}-${id}`);

    expect(navLinkEl).toBeInTheDocument();
    expect(navLinkEl).toHaveClass('nav__link mx-auto', { exact: true });
    expect(navLinkEl).toHaveAttribute('title', 'Title');
    expect(navLinkEl).toHaveAttribute('href', routesConstants.ABOUT.ROOT);
    expect(navLinkEl).toHaveAttribute('data-nav', 'dataNav');
    expect(navLinkEl).toHaveAttribute('data-dropdown-nav', 'dataDropdownNav');

    fireEvent.blur(navLinkEl);
    expect(onBlur).toHaveBeenCalledTimes(1);

    expect(navLinkTextEl).toBeInTheDocument();
    expect(navLinkTextEl).toHaveTextContent('Content');
  });

  it('should render NavLink component with active class', async () => {
    render(
      <MemoryRouter
        basename={process.env.BASE_URL}
        initialEntries={[routesConstants.ABOUT.ROOT]}
      >
        <I18nextProvider>
          <NavLink
            title="Title"
            to={routesConstants.ABOUT.ROOT}
          >
            Content
          </NavLink>
        </I18nextProvider>
      </MemoryRouter>,
    );

    const navLinkEl = screen.getByTestId(testsConstants.NAV_LINK);
    const navLinkTextEl = screen.getByTestId(testsConstants.NAV_LINK_TEXT);
    const navLinkTextHelperEl = screen.getByTestId(testsConstants.NAV_LINK_TEXT_HELPER);

    expect(navLinkEl).toBeInTheDocument();
    expect(navLinkEl).toHaveClass('active');
    expect(navLinkEl).toHaveAttribute('aria-current', 'page');
    expect(navLinkEl).toHaveAttribute('title', 'Title');
    expect(navLinkEl).toHaveAttribute('href', routesConstants.ABOUT.ROOT);

    expect(navLinkTextEl).toBeInTheDocument();
    expect(navLinkTextEl).toHaveTextContent('Content');

    expect(navLinkTextHelperEl).toBeInTheDocument();
    expect(navLinkTextHelperEl).toHaveTextContent('(Jesteś tutaj)');
  });
});
