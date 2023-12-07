import { addons } from '@storybook/addons';
import { create } from '@storybook/theming';
import logo from '../src/client/assets/images/logo-dark.svg';

addons.setConfig({
  theme: create({
    base: 'light',
    brandTitle: 'Blog o kodowaniu',
    brandImage: logo,
    colorSecondary: '#ca164c',
  }),
});
