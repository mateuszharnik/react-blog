import React from 'react';
import { render, screen } from '@testing-library/react';
import testIds from '@shared/testIds';
import AuthContainer from './index';

describe('AuthContainer', () => {
  it('should render AuthContainer component', async () => {
    render(<AuthContainer>Content</AuthContainer>);

    const authContainerEl = screen.getByTestId(testIds.AuthContainer);

    expect(authContainerEl).toBeInTheDocument();
    expect(authContainerEl).toHaveTextContent('Content');
  });
});
