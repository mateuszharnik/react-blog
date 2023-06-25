import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { testsConstants, routesConstants } from '@shared/constants';
import I18nextProvider from '@client/providers/i18nextProvider';
import WelcomeBanner from './index';

describe('WelcomeBanner', () => {
  it('should render WelcomeBanner component with styles equal 416px', async () => {
    window.innerHeight = 500;

    render(
      <MemoryRouter
        basename={process.env.BASE_URL}
        initialEntries={[routesConstants.ROOT]}
      >
        <I18nextProvider>
          <WelcomeBanner />
        </I18nextProvider>
      </MemoryRouter>,
    );

    const welcomeBannerEl = screen.getByTestId(testsConstants.WELCOME_BANNER);

    expect(welcomeBannerEl).toBeInTheDocument();
    expect(welcomeBannerEl).toHaveStyle(`height: ${window.innerHeight - 84}px`);
  });
});
