import { number, string } from 'prop-types';
import { childrenPropTypes } from '../childrenPropTypes';

export const maxViewHeightPropTypes = {
  props: {
    offsetHeight: number,
    className: string,
    children: childrenPropTypes.props,
  },
  default: {
    offsetHeight: 0,
    className: '',
    children: childrenPropTypes.default,
  },
};
