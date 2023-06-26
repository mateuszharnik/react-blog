import { string } from 'prop-types';
import { childrenPropTypes } from '../childrenPropTypes';

export const activeLinkPropTypes = {
  props: {
    to: string.isRequired,
    id: string,
    className: string,
    children: childrenPropTypes.props,
  },
  default: {
    id: '',
    className: 'link',
    children: childrenPropTypes.default,
  },
};
