import { string, func } from 'prop-types';

export const navImageLinkPropTypes = {
  type: string.isRequired,
  gender: string.isRequired,
  src: string,
  onBlur: func,
};

export const navImageLinkDefaultProps = {
  onBlur: () => {},
  src: '',
};
