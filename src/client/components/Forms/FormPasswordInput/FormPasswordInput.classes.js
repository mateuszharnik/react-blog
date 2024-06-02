import { cva } from 'class-variance-authority';

export const getPasswordInputClassName = cva('form-control password-input', {
  variants: {
    isValid: {
      true: 'valid',
    },
    showToggler: {
      true: 'password-input--show-toggler',
    },
  },
  defaultVariants: {
    isValid: false,
    showToggler: false,
  },
});
