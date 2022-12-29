import React from 'react';
import { render, screen } from '@testing-library/react';
import testIds from '@shared/testIds';
import PageContainer from './index';

describe('PageContainer', () => {
  it('should render PageContainer component', async () => {
    render(<PageContainer>Content</PageContainer>);

    const pageContainerEl = screen.getByTestId(testIds.PageContainer);

    expect(pageContainerEl).toBeInTheDocument();
    expect(pageContainerEl).toHaveTextContent('Content');
  });
});
