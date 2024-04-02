import { bool, string } from 'prop-types';

export const formValidationErrorPropTypes = {
  props: {
    className: string,
    error: string,
    touched: bool,
  },
  default: {
    className: '',
    error: '',
    touched: false,
  },
};
