import { string } from 'prop-types';
import { childrenPropTypes } from '../childrenPropTypes';

export const formPropTypes = {
  props: {
    className: string,
    children: childrenPropTypes.props,
  },
  default: {
    className: '',
    children: childrenPropTypes.default,
  },
};
