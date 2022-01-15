import { createStore } from 'easy-peasy';
import app from './app.store';
import nav from './nav.store';

const model = {
  app,
  nav,
};

const store = createStore(
  model,
  {
    devTools: process.env.NODE_ENV !== 'production',
  },
);

export default store;
