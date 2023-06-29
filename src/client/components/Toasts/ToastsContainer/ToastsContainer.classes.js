import { cva } from 'class-variance-authority';
import { propTypesConstants } from '@shared/constants';

const { TOAST_POSITIONS } = propTypesConstants;

export const getDivClassName = cva('toast-wrapper', {
  variants: {
    position: {
      [TOAST_POSITIONS.TOP_LEFT]: 'toast-wrapper__top-left',
      [TOAST_POSITIONS.TOP_CENTER]: 'toast-wrapper__top-center',
      [TOAST_POSITIONS.TOP_RIGHT]: 'toast-wrapper__top-right',
      [TOAST_POSITIONS.BOTTOM_LEFT]: 'toast-wrapper__bottom-left',
      [TOAST_POSITIONS.BOTTOM_CENTER]: 'toast-wrapper__bottom-center',
      [TOAST_POSITIONS.BOTTOM_RIGHT]: 'toast-wrapper__bottom-right',
    },
  },
});
