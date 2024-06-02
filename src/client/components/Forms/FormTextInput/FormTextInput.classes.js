import { cva } from 'class-variance-authority';

export const getTextInputClassName = cva('form-control', {
  variants: {
    isValid: {
      true: 'valid',
    },
  },
  defaultVariants: {
    isValid: false,
  },
});
