import { render, screen } from '@client/utils/testUtils';
import { testsConstants } from '@shared/constants';
import AuthWrapper from './index';

describe('AuthWrapper', () => {
  it('should render AuthWrapper component', async () => {
    await render(AuthWrapper, {
      children: 'Content',
    });

    const authWrapperEl = screen.getByTestId(testsConstants.AUTH_WRAPPER);

    expect(authWrapperEl).toBeInTheDocument();
    expect(authWrapperEl).toHaveTextContent('Content');
  });
});
