import React from 'react';
import { render, screen } from '@testing-library/react';
import testIds from '@shared/testIds';
import PageWrapper from './index';

describe('PageWrapper', () => {
  it('should render PageWrapper component', async () => {
    render(<PageWrapper>Content</PageWrapper>);

    const pageWrapperEl = screen.getByTestId(testIds.PageWrapper);

    expect(pageWrapperEl).toBeInTheDocument();
    expect(pageWrapperEl).toHaveTextContent('Content');
  });
});
