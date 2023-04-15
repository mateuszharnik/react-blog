import { render, screen } from '@testing-library/react';
import { testsConstants } from '@shared/constants';
import Spinner from './index';

describe('Spinner', () => {
  it('should render Spinner component', async () => {
    render(<Spinner />);

    const spinnerEl = screen.getByTestId(testsConstants.SPINNER);

    expect(spinnerEl).toBeInTheDocument();
  });
});
