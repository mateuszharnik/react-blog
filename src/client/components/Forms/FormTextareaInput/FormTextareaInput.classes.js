import { cva } from 'class-variance-authority';

export const getTextareaInputClassName = cva('form-control', {
  variants: {
    isValid: {
      true: 'valid',
    },
  },
  defaultVariants: {
    isValid: false,
  },
});
