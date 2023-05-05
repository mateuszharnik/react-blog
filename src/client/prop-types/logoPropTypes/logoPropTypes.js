import { number, bool } from 'prop-types';

export const logoPropTypes = {
  width: number,
  height: number,
  dark: bool,
};

export const logoDefaultProps = {
  width: 54,
  height: 30,
  dark: false,
};
