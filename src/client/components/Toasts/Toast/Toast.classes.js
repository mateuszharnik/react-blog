import { cva } from 'class-variance-authority';
import { toastsConstants } from '@shared/constants';

export const getToastClassName = cva('toast', {
  variants: {
    type: {
      [toastsConstants.TYPE.WARNING]: 'toast-warning',
      [toastsConstants.TYPE.DANGER]: 'toast-danger',
      [toastsConstants.TYPE.INFO]: 'toast-info',
      [toastsConstants.TYPE.SUCCESS]: 'toast-success',
      [toastsConstants.TYPE.PRIMARY]: 'toast-primary',
    },
    marginBottom: {
      true: 'mt-2',
      false: 'mb-2',
    },
  },
});
