import { render, screen } from '@client/utils/testUtils';
import Spinner from './index';

describe('Spinner', () => {
  it('should render Spinner component', async () => {
    await render(Spinner, {
      props: {
        'data-testid': 'SpinnerTestId',
      },
    });

    const spinnerEl = screen.getByTestId('SpinnerTestId');

    expect(spinnerEl).toBeInTheDocument();
  });
});
