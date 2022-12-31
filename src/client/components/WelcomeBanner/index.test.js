import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import { render, screen } from '@testing-library/react';
import testIds from '@shared/testIds';
import i18n from '@client/locales/i18n';
import WelcomeBanner from './index';

describe('WelcomeBanner', () => {
  it('should render WelcomeBanner component with styles equal 416px', async () => {
    window.innerHeight = 500;

    render(
      <MemoryRouter
        basename="/"
        initialEntries={['/']}
      >
        <I18nextProvider i18n={i18n}>
          <WelcomeBanner />
        </I18nextProvider>
      </MemoryRouter>,
    );

    const welcomeBannerEl = screen.getByTestId(testIds.WelcomeBanner);

    expect(welcomeBannerEl).toBeInTheDocument();
    expect(welcomeBannerEl).toHaveStyle(`height: ${window.innerHeight - 84}px`);
  });
});
