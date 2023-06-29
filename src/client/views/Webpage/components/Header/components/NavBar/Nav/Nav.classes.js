import { cva } from 'class-variance-authority';

export const getDivClassName = cva('nav__list-container d-flex align-items-center', {
  variants: {
    user: {
      true: 'justify-content-between',
      false: 'justify-content-end',
    },
  },
  defaultVariants: {
    user: false,
  },
});

export const getNavItemClassName = cva('nav__item text-center mb-3 mb-lg-0', {
  variants: {
    user: {
      false: 'nav__link-image-wrapper',
    },
  },
  defaultVariants: {
    user: false,
  },
});

export const getNavListClassName = cva('nav__list-wrapper', {
  variants: {
    isOpen: {
      true: 'open',
    },
    display: {
      true: 'd-none',
    },
  },
  defaultVariants: {
    isOpen: false,
    display: false,
  },
});

export const getNavClassName = cva('nav', {
  variants: {
    isAnimated: {
      true: 'nav--pointer-none',
    },
  },
  defaultVariants: {
    isAnimated: false,
  },
});
