import { string, func } from 'prop-types';

export const navImageLinkPropTypes = {
  props: {
    type: string.isRequired,
    gender: string.isRequired,
    src: string,
    onBlur: func,
  },
  default: {
    src: '',
    onBlur: undefined,
  },
};
