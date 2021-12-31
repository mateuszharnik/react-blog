import { createStore } from 'easy-peasy';
import app from './app.store';

const model = {
  app,
};

const store = createStore(
  model,
  {
    devTools: process.env.NODE_ENV !== 'production',
  },
);

export default store;
