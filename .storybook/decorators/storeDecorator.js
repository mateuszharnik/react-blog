import StoreProvider from '@client/providers/storeProvider';

export const storeDecorator = (Story) => (
  <StoreProvider>
    <Story />
  </StoreProvider>
);
