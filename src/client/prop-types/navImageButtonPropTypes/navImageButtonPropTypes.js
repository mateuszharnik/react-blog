import { string } from 'prop-types';

export const navImageButtonPropTypes = {
  type: string.isRequired,
  gender: string.isRequired,
  src: string,
};

export const navImageButtonDefaultProps = {
  src: '',
};
