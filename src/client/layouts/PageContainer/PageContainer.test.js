import { render, screen } from '@client/utils/testUtils';
import { testsConstants } from '@shared/constants';
import PageContainer from './index';

describe('PageContainer', () => {
  it('should render PageContainer component', async () => {
    await render(PageContainer, {
      children: 'Content',
    });

    const pageContainerEl = screen.getByTestId(testsConstants.PAGE_CONTAINER);

    expect(pageContainerEl).toBeInTheDocument();
    expect(pageContainerEl).toHaveTextContent('Content');
  });
});
