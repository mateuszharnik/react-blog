import { number, bool } from 'prop-types';

export const logoPropTypes = {
  props: {
    width: number,
    height: number,
    dark: bool,
  },
  default: {
    width: 54,
    height: 30,
    dark: false,
  },

};
