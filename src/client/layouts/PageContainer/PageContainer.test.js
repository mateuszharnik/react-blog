import { render, screen } from '@testing-library/react';
import { testsConstants } from '@shared/constants';
import PageContainer from './index';

describe('PageContainer', () => {
  it('should render PageContainer component', async () => {
    render(<PageContainer>Content</PageContainer>);

    const pageContainerEl = screen.getByTestId(testsConstants.PAGE_CONTAINER);

    expect(pageContainerEl).toBeInTheDocument();
    expect(pageContainerEl).toHaveTextContent('Content');
  });
});
