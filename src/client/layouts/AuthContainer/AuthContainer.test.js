import { render, screen } from '@client/utils/testUtils';
import { testsConstants } from '@shared/constants';
import AuthContainer from './index';

describe('AuthContainer', () => {
  it('should render AuthContainer component', async () => {
    await render(AuthContainer, {
      children: 'Content',
    });

    const authContainerEl = screen.getByTestId(testsConstants.AUTH_CONTAINER);

    expect(authContainerEl).toBeInTheDocument();
    expect(authContainerEl).toHaveTextContent('Content');
  });
});
