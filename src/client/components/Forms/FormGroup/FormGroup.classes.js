import { cva } from 'class-variance-authority';
import { propTypesConstants } from '@shared/constants';

const { FORM_GROUP_TYPES } = propTypesConstants;

export const getFormGroupClassName = cva('col-12', {
  variants: {
    type: {
      [FORM_GROUP_TYPES.BUTTON]: 'mb-0',
      [FORM_GROUP_TYPES.INPUT]: 'mb-3',
    },
  },
  defaultVariants: {
    type: FORM_GROUP_TYPES.INPUT,
  },
});
