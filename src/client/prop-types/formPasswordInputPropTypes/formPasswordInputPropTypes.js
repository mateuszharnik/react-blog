import { bool, string, func } from 'prop-types';

export const formPasswordInputPropTypes = {
  props: {
    className: string,
    value: string,
    error: string,
    touched: bool,
    showToggler: bool,
    type: string,
    onChange: func,
    onBlur: func,
  },
  default: {
    className: '',
    value: '',
    error: '',
    touched: false,
    showToggler: false,
    type: 'password',
    onChange: undefined,
    onBlur: undefined,
  },
};
