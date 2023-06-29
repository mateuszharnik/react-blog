import { oneOfType, arrayOf, node } from 'prop-types';

export const childrenPropTypes = {
  props: oneOfType([arrayOf(node), node]),
  default: null,
};
