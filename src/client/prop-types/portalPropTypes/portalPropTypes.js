import { string, bool } from 'prop-types';
import { childrenPropTypes } from '../childrenPropTypes';

export const portalPropTypes = {
  props: {
    to: string.isRequired,
    prepend: bool,
    children: childrenPropTypes.props,
  },
  default: {
    prepend: false,
    children: childrenPropTypes.default,
  },
};
