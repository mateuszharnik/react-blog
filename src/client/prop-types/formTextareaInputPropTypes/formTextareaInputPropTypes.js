import { bool, string, func } from 'prop-types';

export const formTextareaInputPropTypes = {
  props: {
    className: string,
    value: string,
    error: string,
    touched: bool,
    rows: string,
    onChange: func,
    onBlur: func,
  },
  default: {
    className: '',
    value: '',
    error: '',
    touched: false,
    rows: '6',
    onChange: undefined,
    onBlur: undefined,
  },
};
