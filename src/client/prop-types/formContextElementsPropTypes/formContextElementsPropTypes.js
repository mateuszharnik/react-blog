import {
  string, elementType, func, oneOfType,
} from 'prop-types';

export const formContextElementsPropTypes = {
  props: {
    field: string.isRequired,
    id: string,
    value: string,
    label: oneOfType([elementType, string]),
    helpText: oneOfType([elementType, string]),
    onChange: func,
    onBlur: func,
  },
  default: {
    id: undefined,
    value: undefined,
    label: undefined,
    helpText: undefined,
    onChange: undefined,
    onBlur: undefined,
  },
};
