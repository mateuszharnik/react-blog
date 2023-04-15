import { render, screen } from '@testing-library/react';
import { testsConstants } from '@shared/constants';
import I18nextProvider from '@client/providers/i18nextProvider';
import Logo from './index';

describe('Logo', () => {
  it('should render Logo component', async () => {
    render(
      <I18nextProvider>
        <Logo />
      </I18nextProvider>,
    );

    const logoEl = screen.getByTestId(testsConstants.PAGE_LOGO);

    expect(logoEl).toBeInTheDocument();
    expect(logoEl).toHaveAttribute('src', 'logo-light.svg');
    expect(logoEl).toHaveAttribute('alt', 'Logo strony');
  });

  it('should render Logo component with given props', async () => {
    render(
      <I18nextProvider>
        <Logo
          width={200}
          height={100}
          dark
        />
      </I18nextProvider>,
    );

    const logoEl = screen.getByTestId(testsConstants.PAGE_LOGO);

    expect(logoEl).toBeInTheDocument();
    expect(logoEl).toHaveAttribute('src', 'logo-dark.svg');
    expect(logoEl).toHaveAttribute('alt', 'Logo strony');
    expect(logoEl).toHaveAttribute('width', '200');
    expect(logoEl).toHaveAttribute('height', '100');
  });
});
