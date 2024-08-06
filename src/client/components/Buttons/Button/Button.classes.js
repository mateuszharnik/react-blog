import { cva } from 'class-variance-authority';
import { propTypesConstants } from '@shared/constants';

const { BUTTON_SIZES, BUTTON_COLORS, BUTTON_VARIANTS } = propTypesConstants;

export const getButtonClassName = cva('btn', {
  variants: {
    color: {
      [BUTTON_COLORS.PRIMARY]: null,
      [BUTTON_COLORS.SECONDARY]: null,
      [BUTTON_COLORS.SUCCESS]: null,
      [BUTTON_COLORS.DANGER]: null,
      [BUTTON_COLORS.WARNING]: null,
      [BUTTON_COLORS.INFO]: null,
    },
    variant: {
      [BUTTON_VARIANTS.SOLID]: null,
      [BUTTON_VARIANTS.OUTLINE]: null,
    },
    size: {
      [BUTTON_SIZES.SMALL]: 'btn-sm',
      [BUTTON_SIZES.MEDIUM]: 'btn-md',
      [BUTTON_SIZES.LARGE]: 'btn-lg',
    },
    rounded: {
      true: 'rounded-pill',
    },
  },
  compoundVariants: [
    { color: BUTTON_COLORS.PRIMARY, variant: BUTTON_VARIANTS.SOLID, className: 'btn-primary' },
    { color: BUTTON_COLORS.SECONDARY, variant: BUTTON_VARIANTS.SOLID, className: 'btn-secondary' },
    { color: BUTTON_COLORS.SUCCESS, variant: BUTTON_VARIANTS.SOLID, className: 'btn-success' },
    { color: BUTTON_COLORS.DANGER, variant: BUTTON_VARIANTS.SOLID, className: 'btn-danger' },
    { color: BUTTON_COLORS.WARNING, variant: BUTTON_VARIANTS.SOLID, className: 'btn-warning' },
    { color: BUTTON_COLORS.INFO, variant: BUTTON_VARIANTS.SOLID, className: 'btn-info' },
    { color: BUTTON_COLORS.PRIMARY, variant: BUTTON_VARIANTS.OUTLINE, className: 'btn-outline-primary' },
    { color: BUTTON_COLORS.SECONDARY, variant: BUTTON_VARIANTS.OUTLINE, className: 'btn-outline-secondary' },
    { color: BUTTON_COLORS.SUCCESS, variant: BUTTON_VARIANTS.OUTLINE, className: 'btn-outline-success' },
    { color: BUTTON_COLORS.DANGER, variant: BUTTON_VARIANTS.OUTLINE, className: 'btn-outline-danger' },
    { color: BUTTON_COLORS.WARNING, variant: BUTTON_VARIANTS.OUTLINE, className: 'btn-outline-warning' },
    { color: BUTTON_COLORS.INFO, variant: BUTTON_VARIANTS.OUTLINE, className: 'btn-outline-info' },
  ],
  defaultVariants: {
    color: BUTTON_COLORS.PRIMARY,
    variant: BUTTON_VARIANTS.OUTLINE,
    size: BUTTON_SIZES.MEDIUM,
    rounded: false,
  },
});
