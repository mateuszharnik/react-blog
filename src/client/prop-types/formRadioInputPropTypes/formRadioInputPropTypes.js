import { bool, string, func } from 'prop-types';

export const formRadioInputPropTypes = {
  props: {
    value: string.isRequired,
    checked: bool.isRequired,
    className: string,
    type: string,
    onChange: func,
    onBlur: func,
  },
  default: {
    className: '',
    type: 'radio',
    onChange: undefined,
    onBlur: undefined,
  },
};
