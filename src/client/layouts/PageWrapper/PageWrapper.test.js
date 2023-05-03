import { render, screen } from '@testing-library/react';
import { testsConstants } from '@shared/constants';
import PageWrapper from './index';

describe('PageWrapper', () => {
  it('should render PageWrapper component', async () => {
    render(<PageWrapper>Content</PageWrapper>);

    const pageWrapperEl = screen.getByTestId(testsConstants.PAGE_WRAPPER);

    expect(pageWrapperEl).toBeInTheDocument();
    expect(pageWrapperEl).toHaveTextContent('Content');
  });
});
