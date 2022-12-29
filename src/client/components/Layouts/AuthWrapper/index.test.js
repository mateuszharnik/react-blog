import React from 'react';
import { render, screen } from '@testing-library/react';
import testIds from '@shared/testIds';
import AuthWrapper from './index';

describe('AuthWrapper', () => {
  it('should render AuthWrapper component', async () => {
    render(<AuthWrapper>Content</AuthWrapper>);

    const authWrapperEl = screen.getByTestId(testIds.AuthWrapper);

    expect(authWrapperEl).toBeInTheDocument();
    expect(authWrapperEl).toHaveTextContent('Content');
  });
});
