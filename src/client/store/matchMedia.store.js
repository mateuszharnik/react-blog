/* eslint-disable no-param-reassign */
import { action } from 'easy-peasy';

const matchMedia = {
  isDesktop: false,
  setIsDesktop: action((state, payload) => {
    state.isDesktop = payload;
  }),
};

export default matchMedia;
