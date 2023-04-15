import { render, screen } from '@testing-library/react';
import { testsConstants } from '@shared/constants';
import AuthWrapper from './index';

describe('AuthWrapper', () => {
  it('should render AuthWrapper component', async () => {
    render(<AuthWrapper>Content</AuthWrapper>);

    const authWrapperEl = screen.getByTestId(testsConstants.AUTH_WRAPPER);

    expect(authWrapperEl).toBeInTheDocument();
    expect(authWrapperEl).toHaveTextContent('Content');
  });
});
