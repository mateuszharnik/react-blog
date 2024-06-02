import { oneOf } from 'prop-types';
import { propTypesConstants } from '@shared/constants';
import { childrenPropTypes } from '../childrenPropTypes';

const headingTypesArray = Object.values(propTypesConstants.HEADING_TYPES);

export const headingPropTypes = {
  props: {
    as: oneOf(headingTypesArray),
    children: childrenPropTypes.props,
  },
  default: {
    as: propTypesConstants.HEADING_TYPES.H1,
    children: childrenPropTypes.default,
  },
};
