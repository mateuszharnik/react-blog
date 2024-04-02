import { cva } from 'class-variance-authority';
import { propTypesConstants } from '@shared/constants';

const { TOOLTIP_COLORS } = propTypesConstants;

export const getTooltipClassName = cva('tooltip', {
  variants: {
    color: {
      [TOOLTIP_COLORS.DARK]: 'tooltip--dark',
      [TOOLTIP_COLORS.LIGHT]: 'tooltip--light',
    },
    bordered: {
      true: 'tooltip--border',
    },
  },
  defaultVariants: {
    bordered: false,
    color: null,
  },
});
