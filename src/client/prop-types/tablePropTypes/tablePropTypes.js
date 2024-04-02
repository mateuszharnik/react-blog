import { array } from 'prop-types';
import { childrenPropTypes } from '../childrenPropTypes';

export const tablePropTypes = {
  props: {
    rows: array,
    children: childrenPropTypes.props,
  },
  default: {
    rows: [],
    children: childrenPropTypes.default,
  },
};
