import {
  oneOfType, arrayOf, node, func,
} from 'prop-types';

export const childrenPropTypes = {
  props: oneOfType([arrayOf(node), node, func]),
  default: null,
};
