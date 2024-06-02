import {
  bool, string, func, oneOfType,
} from 'prop-types';

export const formCheckboxInputPropTypes = {
  props: {
    value: oneOfType([bool, string]).isRequired,
    checked: bool.isRequired,
    className: string,
    type: string,
    onChange: func,
    onBlur: func,
  },
  default: {
    className: '',
    type: 'checkbox',
    onChange: undefined,
    onBlur: undefined,
  },
};
