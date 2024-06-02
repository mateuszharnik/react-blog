import {
  oneOfType, shape, func, string,
} from 'prop-types';

export const tableTextPropTypes = {
  props: {
    text: oneOfType([string, func]).isRequired,
    context: shape({}).isRequired,
  },
};
