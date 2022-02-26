import { createStore } from 'easy-peasy';
import config from './config.store';
import csrf from './csrf.store';
import user from './user.store';
import contact from './contact.store';
import nav from './nav.store';
import navDropdown from './navDropdown.store';
import layer from './layer.store';
import matchMedia from './matchMedia.store';

const model = {
  config,
  csrf,
  user,
  contact,
  nav,
  navDropdown,
  layer,
  matchMedia,
};

const store = createStore(
  model,
  {
    devTools: process.env.NODE_ENV !== 'production',
  },
);

export default store;
