import { render, screen } from '@client/utils/testUtils';
import { testsConstants } from '@shared/constants';
import Logo from './index';

describe('Logo', () => {
  it('should render Logo component', async () => {
    await render(Logo);

    const logoEl = screen.getByTestId(testsConstants.PAGE_LOGO);

    expect(logoEl).toBeInTheDocument();
    expect(logoEl).toHaveAttribute('src', 'logo-light.svg');
    expect(logoEl).toHaveAttribute('alt', 'Logo strony');
  });

  it('should render Logo component with given props', async () => {
    await render(Logo, {
      props: {
        width: 200,
        height: 100,
        dark: true,
      },
    });

    const logoEl = screen.getByTestId(testsConstants.PAGE_LOGO);

    expect(logoEl).toBeInTheDocument();
    expect(logoEl).toHaveAttribute('src', 'logo-dark.svg');
    expect(logoEl).toHaveAttribute('alt', 'Logo strony');
    expect(logoEl).toHaveAttribute('width', '200');
    expect(logoEl).toHaveAttribute('height', '100');
  });
});
