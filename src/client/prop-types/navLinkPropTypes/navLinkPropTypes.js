import { string, func } from 'prop-types';
import { childrenPropTypes, childrenDefaultProps } from '../childrenPropTypes';

export const navLinkPropTypes = {
  children: childrenPropTypes,
  title: string.isRequired,
  to: string.isRequired,
  onBlur: func,
  id: string,
  dataNav: string,
  dataDropdownNav: string,
};

export const navLinkDefaultProps = {
  children: childrenDefaultProps,
  onBlur: () => {},
  id: '',
  dataNav: null,
  dataDropdownNav: null,
};
