import { oneOf, string, bool } from 'prop-types';
import { propTypesConstants } from '@shared/constants';
import { childrenPropTypes } from '../childrenPropTypes';

const buttonColorsArray = Object.values(propTypesConstants.BUTTON_COLORS);

const buttonVariantsArray = Object.values(propTypesConstants.BUTTON_VARIANTS);

const buttonSizesArray = Object.values(propTypesConstants.BUTTON_SIZES);

const buttonTypesArray = Object.values(propTypesConstants.BUTTON_TYPES);

export const buttonPropTypes = {
  props: {
    type: oneOf(buttonTypesArray),
    variant: oneOf(buttonVariantsArray),
    color: oneOf(buttonColorsArray),
    size: oneOf(buttonSizesArray),
    disabled: bool,
    rounded: bool,
    className: string,
    children: childrenPropTypes.props,
  },
  default: {
    type: propTypesConstants.BUTTON_TYPES.BUTTON,
    variant: propTypesConstants.BUTTON_VARIANTS.OUTLINE,
    color: propTypesConstants.BUTTON_COLORS.PRIMARY,
    size: propTypesConstants.BUTTON_SIZES.MEDIUM,
    disabled: false,
    rounded: false,
    className: '',
    children: childrenPropTypes.default,
  },
};
