import { oneOf } from 'prop-types';
import { propTypesConstants } from '@shared/constants';
import { childrenPropTypes } from '../childrenPropTypes';

const textTypesArray = Object.values(propTypesConstants.TEXT_TYPES);

export const textPropTypes = {
  props: {
    as: oneOf(textTypesArray),
    children: childrenPropTypes.props,
  },
  default: {
    as: propTypesConstants.TEXT_TYPES.PARAGRAPH,
    children: childrenPropTypes.default,
  },
};
