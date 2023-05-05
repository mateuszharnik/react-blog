import { i18nDecorator } from './decorators/i18nDecorator';
import { routerDecorator } from './decorators/routerDecorator';
import { storeDecorator } from './decorators/storeDecorator';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

export const decorators = [
  i18nDecorator,
  routerDecorator,
  storeDecorator,
];
