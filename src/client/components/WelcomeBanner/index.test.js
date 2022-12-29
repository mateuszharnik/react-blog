import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import testIds from '@shared/testIds';
import I18n from '@client/locales/i18n';
import WelcomeBanner from './index';

jest.mock('react-i18next', () => ({
  initReactI18next: {
    type: '3rdParty',
    init: jest.fn(),
  },
  useTranslation: () => ({ t: (str) => str }),
  Trans: ({ i18nKey }) => i18nKey,
}));

describe('WelcomeBanner', () => {
  it('should render WelcomeBanner component with styles equal 416px', async () => {
    window.innerHeight = 500;

    render(
      <MemoryRouter
        basename="/"
        initialEntries={['/']}
      >
        <I18n>
          <WelcomeBanner />
        </I18n>
      </MemoryRouter>,
    );

    const welcomeBannerEl = screen.getByTestId(testIds.WelcomeBanner);

    expect(welcomeBannerEl).toBeInTheDocument();
    expect(welcomeBannerEl).toHaveStyle(`height: ${window.innerHeight - 84}px`);
  });
});
