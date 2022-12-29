import React from 'react';
import { render, screen } from '@testing-library/react';
import testIds from '@shared/testIds';
import Logo from './index';

describe('Logo', () => {
  it('should render Logo component', async () => {
    render(<Logo />);

    const logoEl = screen.getByTestId(testIds.PageLogo);

    expect(logoEl).toBeInTheDocument();
    expect(logoEl).toHaveAttribute('src', 'logo-light.svg');
    expect(logoEl).toHaveAttribute('alt', 'Logo strony');
  });

  it('should render Logo component with given props', async () => {
    render(<Logo
      width={200}
      height={100}
      dark
    />);

    const logoEl = screen.getByTestId(testIds.PageLogo);

    expect(logoEl).toBeInTheDocument();
    expect(logoEl).toHaveAttribute('src', 'logo-dark.svg');
    expect(logoEl).toHaveAttribute('alt', 'Logo strony');
    expect(logoEl).toHaveAttribute('width', '200');
    expect(logoEl).toHaveAttribute('height', '100');
  });
});
