import React from 'react';
import { render, screen } from '@testing-library/react';
import testIds from '@shared/testIds';
import Spinner from './index';

describe('Spinner', () => {
  it('should render Spinner component', async () => {
    render(<Spinner />);

    const spinnerEl = screen.getByTestId(testIds.Spinner);

    expect(spinnerEl).toBeInTheDocument();
  });
});
