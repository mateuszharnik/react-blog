import { func, string, bool } from 'prop-types';

export const hamburgerPropTypes = {
  title: string.isRequired,
  onClick: func.isRequired,
  isExpanded: bool.isRequired,
  text: string,
  onBlur: func,
  hamburgerClassName: string,
  attr: bool,
};

export const hamburgerDefaultProps = {
  onBlur: () => { },
  text: 'Menu',
  hamburgerClassName: '',
  attr: false,
};
