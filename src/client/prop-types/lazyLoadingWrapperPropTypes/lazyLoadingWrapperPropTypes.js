import { number, string } from 'prop-types';
import { childrenPropTypes } from '../childrenPropTypes';

export const lazyLoadingWrapperPropTypes = {
  props: {
    className: string,
    offsetTop: number,
    children: childrenPropTypes.props,
  },
  default: {
    className: '',
    offsetTop: 0,
    children: childrenPropTypes.default,
  },
};
