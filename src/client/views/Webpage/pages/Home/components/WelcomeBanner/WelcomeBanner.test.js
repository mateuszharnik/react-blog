import { render, screen } from '@client/utils/testUtils';
import { testsConstants } from '@shared/constants';
import WelcomeBanner from './index';

describe('WelcomeBanner', () => {
  it('should render WelcomeBanner component with styles equal 416px', async () => {
    window.innerHeight = 500;

    await render(WelcomeBanner);

    const welcomeBannerEl = screen.getByTestId(testsConstants.WELCOME_BANNER);

    expect(welcomeBannerEl).toBeInTheDocument();
    expect(welcomeBannerEl).toHaveStyle(`height: ${window.innerHeight - 84}px`);
  });
});
