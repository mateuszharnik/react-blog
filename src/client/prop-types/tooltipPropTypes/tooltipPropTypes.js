import {
  number, bool, string, func, oneOf,
} from 'prop-types';
import { propTypesConstants } from '@shared/constants';
import { childrenPropTypes } from '../childrenPropTypes';

const tooltipPositionsArray = Object.values(propTypesConstants.FLOATING_POSITIONS);
const tooltipColorsArray = Object.values(propTypesConstants.TOOLTIP_COLORS);

export const tooltipPropTypes = {
  props: {
    position: oneOf(tooltipPositionsArray),
    color: oneOf(tooltipColorsArray),
    bordered: bool,
    tooltip: string.isRequired,
    className: string,
    maxWidth: string,
    showArrow: bool,
    show: bool,
    offsetPadding: number,
    shiftPadding: number,
    onMouseEnter: func,
    onMouseLeave: func,
    children: childrenPropTypes.props,
  },
  default: {
    position: propTypesConstants.FLOATING_POSITIONS.TOP,
    color: undefined,
    bordered: false,
    className: 'position-relative',
    maxWidth: undefined,
    showArrow: true,
    show: false,
    offsetPadding: 12,
    shiftPadding: 8,
    onMouseEnter: undefined,
    onMouseLeave: undefined,
    children: childrenPropTypes.default,
  },
};
