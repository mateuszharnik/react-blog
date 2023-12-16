import {
  oneOf, string, func, bool, object, oneOfType, number, shape, arrayOf,
} from 'prop-types';
import { propTypesConstants } from '@shared/constants';

const toastPositionsArray = Object.values(propTypesConstants.TOAST_POSITIONS);
const toastTypesArray = Object.values(propTypesConstants.TOAST_TYPES);

export const toastsContainerPropTypes = {
  props: {
    toasts: arrayOf([shape({
      id: string.isRequired,
      message: string.isRequired,
      title: string.isRequired,
      delay: number.isRequired,
      autoClose: bool.isRequired,
      progressBar: bool.isRequired,
      type: oneOf(toastTypesArray).isRequired,
      icon: oneOfType([string, object]).isRequired,
    })]),
    position: oneOf(toastPositionsArray),
    marginBottom: bool.isRequired,
    removeToast: func.isRequired,
    removeToasts: func.isRequired,
  },
  default: {
    toasts: [],
    position: propTypesConstants.TOAST_POSITIONS.BOTTOM_RIGHT,
  },
};
