import { bool, string, func } from 'prop-types';

export const formTextInputPropTypes = {
  props: {
    className: string,
    value: string,
    error: string,
    touched: bool,
    type: string,
    onChange: func,
    onBlur: func,
  },
  default: {
    className: '',
    value: '',
    error: '',
    touched: false,
    type: 'text',
    onChange: undefined,
    onBlur: undefined,
  },
};
