import { string } from 'prop-types';
import { childrenPropTypes } from '../childrenPropTypes';

export const linkPropTypes = {
  props: {
    to: string.isRequired,
    className: string,
    children: childrenPropTypes.props,
  },
  default: {
    className: 'link',
    children: childrenPropTypes.default,
  },
};
