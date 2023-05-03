import I18nextProvider from '@client/providers/i18nextProvider';

export const i18nDecorator = (Story) => (
  <I18nextProvider>
    <Story />
  </I18nextProvider>
);
