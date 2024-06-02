import { render, screen } from '@client/utils/testUtils';
import { testsConstants } from '@shared/constants';
import PageWrapper from './index';

describe('PageWrapper', () => {
  it('should render PageWrapper component', async () => {
    await render(PageWrapper, {
      children: 'Content',
    });

    const pageWrapperEl = screen.getByTestId(testsConstants.PAGE_WRAPPER);

    expect(pageWrapperEl).toBeInTheDocument();
    expect(pageWrapperEl).toHaveTextContent('Content');
  });
});
