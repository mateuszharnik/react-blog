import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import testIds from '@shared/testIds';
import WelcomeBanner from './index';

describe('WelcomeBanner', () => {
  it('should render WelcomeBanner component with styles equal 416px', async () => {
    window.innerHeight = 500;

    render(
      <MemoryRouter
        basename="/"
        initialEntries={['/']}
      >
        <WelcomeBanner />
      </MemoryRouter>,
    );

    const welcomeBannerEl = screen.getByTestId(testIds.WelcomeBanner);

    expect(welcomeBannerEl).toBeInTheDocument();
    expect(welcomeBannerEl).toHaveStyle(`height: ${window.innerHeight - 84}px`);
  });
});
