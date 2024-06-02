import { string, func } from 'prop-types';

export const navImageButtonPropTypes = {
  props: {
    type: string.isRequired,
    gender: string.isRequired,
    handleSignOut: func.isRequired,
    src: string,
  },
  default: {
    src: '',
  },
};
