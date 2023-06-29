import { string } from 'prop-types';
import { childrenPropTypes } from '../childrenPropTypes';

export const portalPropTypes = {
  props: {
    to: string.isRequired,
    children: childrenPropTypes.props,
  },
  default: {
    children: childrenPropTypes.default,
  },
};
