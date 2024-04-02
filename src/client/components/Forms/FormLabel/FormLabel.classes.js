import { cva } from 'class-variance-authority';
import { propTypesConstants } from '@shared/constants';

const { LABEL_TYPES } = propTypesConstants;

export const getFormLabelClassName = cva('', {
  variants: {
    type: {
      [LABEL_TYPES.INPUT]: 'form-label',
      [LABEL_TYPES.CHECK]: 'form-check-label',
    },
  },
  defaultVariants: {
    type: LABEL_TYPES.INPUT,
  },
});
