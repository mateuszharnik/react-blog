import { string } from 'prop-types';
import { childrenPropTypes } from '../childrenPropTypes';

export const formHelpTextPropTypes = {
  props: {
    className: string,
    children: childrenPropTypes.props,
  },
  default: {
    className: '',
    children: childrenPropTypes.default,
  },
};
