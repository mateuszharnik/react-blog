import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import testIds from '@shared/testIds';
import NavLink from './index';

describe('NavLink', () => {
  it('should render NavLink component with required props', async () => {
    render(
      <MemoryRouter
        basename="/"
        initialEntries={['/']}
      >
        <NavLink
          title="Title"
          to="/o-blogu"
        >
          Content
        </NavLink>,
      </MemoryRouter>,
    );

    const navLinkEl = screen.getByTestId(testIds.NavLink);
    const navLinkTextEl = screen.getByTestId(testIds.NavLinkText);

    expect(navLinkEl).toBeInTheDocument();
    expect(navLinkEl).toHaveClass('nav__link mx-auto', { exact: true });
    expect(navLinkEl).toHaveAttribute('title', 'Title');
    expect(navLinkEl).toHaveAttribute('href', '/o-blogu');

    expect(navLinkTextEl).toBeInTheDocument();
    expect(navLinkTextEl).toHaveTextContent('Content');
  });

  it('should render NavLink component with all props', async () => {
    const onBlur = jest.fn();
    const id = 'test';

    render(
      <MemoryRouter
        basename="/"
        initialEntries={['/']}
      >
        <NavLink
          title="Title"
          to="/o-blogu"
          dataNav="dataNav"
          dataDropdownNav="dataDropdownNav"
          id={id}
          onBlur={onBlur}
        >
          Content
        </NavLink>,
      </MemoryRouter>,
    );

    const navLinkEl = screen.getByTestId(`${testIds.NavLink}-${id}`);
    const navLinkTextEl = screen.getByTestId(`${testIds.NavLinkText}-${id}`);

    expect(navLinkEl).toBeInTheDocument();
    expect(navLinkEl).toHaveClass('nav__link mx-auto', { exact: true });
    expect(navLinkEl).toHaveAttribute('title', 'Title');
    expect(navLinkEl).toHaveAttribute('href', '/o-blogu');
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
        basename="/"
        initialEntries={['/o-blogu']}
      >
        <NavLink
          title="Title"
          to="/o-blogu"
        >
          Content
        </NavLink>,
      </MemoryRouter>,
    );

    const navLinkEl = screen.getByTestId(testIds.NavLink);
    const navLinkTextEl = screen.getByTestId(testIds.NavLinkText);
    const navLinkTextHelperEl = screen.getByTestId(testIds.NavLinkTextHelper);

    expect(navLinkEl).toBeInTheDocument();
    expect(navLinkEl).toHaveClass('active');
    expect(navLinkEl).toHaveAttribute('aria-current', 'page');
    expect(navLinkEl).toHaveAttribute('title', 'Title');
    expect(navLinkEl).toHaveAttribute('href', '/o-blogu');

    expect(navLinkTextEl).toBeInTheDocument();
    expect(navLinkTextEl).toHaveTextContent('Content');

    expect(navLinkTextHelperEl).toBeInTheDocument();
    expect(navLinkTextHelperEl).toHaveTextContent('(Jesteś tutaj)');
  });
});
