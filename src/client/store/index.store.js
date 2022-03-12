import { createStore } from 'easy-peasy';
import layer from './layer.store';
import csrf from './csrf.store';
import auth from './auth.store';
import tokens from './tokens.store';
import nav from './nav.store';
import navDropdown from './navDropdown.store';
import about from './about.store';
import matchMedia from './matchMedia.store';
import user from './user.store';
import contact from './contact.store';
import config from './config.store';
import docs from './docs.store';

const model = {
  layer,
  csrf,
  tokens,
  auth,
  nav,
  navDropdown,
  about,
  contact,
  config,
  user,
  matchMedia,
  docs,
};

const store = createStore(
  model,
  {
    devTools: process.env.NODE_ENV !== 'production',
  },
);

export default store;
