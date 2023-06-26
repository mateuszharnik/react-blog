import { string } from 'prop-types';

export const navImageButtonPropTypes = {
  props: {
    type: string.isRequired,
    gender: string.isRequired,
    src: string,
  },
  default: {
    src: '',
  },
};
