import React from 'react';
import {
  fireEvent, render, screen, waitFor,
} from '@testing-library/react';
import logoDark from '@client/assets/images/logo-dark.svg';
import testIds from '@shared/testIds';
import LazyImage from './index';

describe('LazyImage', () => {
  it('should render LazyImage component with required props', async () => {
    render(<LazyImage
      src={logoDark}
      height={200}
      width={200}
    />);

    const imageWrapperEl = screen.getByTestId(testIds.LazyLoadImageWrapper);
    const imageEl = screen.getByTestId(testIds.LazyLoadImage);
    const spinnerEl = screen.getByTestId(testIds.LazyLoadImageSpinner);

    expect(imageWrapperEl).toBeInTheDocument();
    expect(imageWrapperEl).not.toHaveClass();

    expect(imageEl).toBeInTheDocument();
    expect(imageEl).toHaveClass('lazy-load-image lazy-load-image--hidden', { exact: true });
    expect(imageEl).toHaveAttribute('data-src', logoDark);
    expect(imageEl).toHaveAttribute('width', '200');
    expect(imageEl).toHaveAttribute('height', '200');

    expect(spinnerEl).toBeInTheDocument();
    expect(spinnerEl).not.toHaveClass();

    fireEvent.load(imageEl);

    await waitFor(() => {
      expect(spinnerEl).not.toBeInTheDocument();
      expect(imageEl).toHaveClass('lazy-load-image', { exact: true });
    });
  });

  it('should render LazyImage component with all props', async () => {
    render(<LazyImage
      src={logoDark}
      height={200}
      width={200}
      alt="Alt"
      divClassName="divClassName"
      imgClassName="imgClassName"
      spinnerClassName="spinnerClassName"
    />);

    const imageWrapperEl = screen.getByTestId(testIds.LazyLoadImageWrapper);
    const imageEl = screen.getByTestId(testIds.LazyLoadImage);
    const spinnerEl = screen.getByTestId(testIds.LazyLoadImageSpinner);

    expect(imageWrapperEl).toBeInTheDocument();
    expect(imageWrapperEl).toHaveClass('divClassName', { exact: true });

    expect(imageEl).toBeInTheDocument();
    expect(imageEl).toHaveClass('lazy-load-image lazy-load-image--hidden imgClassName', { exact: true });
    expect(imageEl).toHaveAttribute('data-src', logoDark);
    expect(imageEl).toHaveAttribute('width', '200');
    expect(imageEl).toHaveAttribute('height', '200');
    expect(imageEl).toHaveAttribute('alt', 'Alt');

    expect(spinnerEl).toBeInTheDocument();
    expect(spinnerEl).toHaveClass('spinnerClassName', { exact: true });

    fireEvent.load(imageEl);

    await waitFor(() => {
      expect(spinnerEl).not.toBeInTheDocument();
      expect(imageEl).toHaveClass('lazy-load-image imgClassName', { exact: true });
    });
  });
});
