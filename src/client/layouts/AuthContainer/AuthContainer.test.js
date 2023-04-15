import { render, screen } from '@testing-library/react';
import { testsConstants } from '@shared/constants';
import AuthContainer from './index';

describe('AuthContainer', () => {
  it('should render AuthContainer component', async () => {
    render(<AuthContainer>Content</AuthContainer>);

    const authContainerEl = screen.getByTestId(testsConstants.AUTH_CONTAINER);

    expect(authContainerEl).toBeInTheDocument();
    expect(authContainerEl).toHaveTextContent('Content');
  });
});
