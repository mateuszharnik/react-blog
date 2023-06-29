import {
  bool, number, string, shape, oneOfType, oneOf, object,
} from 'prop-types';
import { propTypesConstants } from '@shared/constants';

const toastTypesArray = Object.values(propTypesConstants.TOAST_TYPES);

export const toastPropTypes = {
  props: {
    marginBottom: bool.isRequired,
    toast: shape({
      id: string.isRequired,
      message: string.isRequired,
      title: string.isRequired,
      delay: number.isRequired,
      autoClose: bool.isRequired,
      progressBar: bool.isRequired,
      type: oneOf(toastTypesArray).isRequired,
      icon: oneOfType([string, object]).isRequired,
    }).isRequired,
  },
};
