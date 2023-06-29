import { string, func } from 'prop-types';
import { childrenPropTypes } from '../childrenPropTypes';

export const navLinkPropTypes = {
  props: {
    title: string.isRequired,
    to: string.isRequired,
    id: string,
    dataNav: string,
    dataDropdownNav: string,
    onBlur: func,
    children: childrenPropTypes.props,
  },
  default: {
    id: '',
    dataNav: undefined,
    dataDropdownNav: undefined,
    onBlur: undefined,
    children: childrenPropTypes.default,
  },
};
