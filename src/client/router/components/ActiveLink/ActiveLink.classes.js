import { cva } from 'class-variance-authority';

export const getActiveLinkClassName = cva('', {
  variants: {
    isActive: {
      true: 'exact-active',
    },
  },
  defaultVariants: {
    isActive: false,
  },
});
