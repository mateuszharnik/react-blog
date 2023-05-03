import {
  string, number, bool, shape, oneOfType, object,
} from 'prop-types';

export const toastPropTypes = {
  marginBottom: bool.isRequired,
  toast: shape({
    id: string.isRequired,
    message: string.isRequired,
    title: string.isRequired,
    delay: number.isRequired,
    autoClose: bool.isRequired,
    progressBar: bool.isRequired,
    type: string.isRequired,
    icon: oneOfType([string, object]).isRequired,
  }).isRequired,
};
