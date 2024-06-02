import { cva } from 'class-variance-authority';

export const getImageClassName = cva('lazy-load-image', {
  variants: {
    isLoaded: {
      false: 'lazy-load-image--hidden',
    },
  },
});
