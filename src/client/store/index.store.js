import { createStore } from 'easy-peasy';
import app from './app.store';
import nav from './nav.store';
import navDropdown from './navDropdown.store';
import matchMedia from './matchMedia.store';

const model = {
  app,
  nav,
  navDropdown,
  matchMedia,
};

const store = createStore(
  model,
  {
    devTools: process.env.NODE_ENV !== 'production',
  },
);

export default store;
