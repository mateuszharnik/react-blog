import { oneOf, number } from 'prop-types';
import { propTypesConstants } from '@shared/constants';

const toastPositionsArray = Object.values(propTypesConstants.TOAST_POSITIONS);

export const toastsContainerPropTypes = {
  props: {
    limit: number,
    position: oneOf(toastPositionsArray),
  },
  default: {
    limit: 5,
    position: propTypesConstants.TOAST_POSITIONS.BOTTOM_RIGHT,
  },
};
