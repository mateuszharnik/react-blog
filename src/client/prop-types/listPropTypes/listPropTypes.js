import { oneOf } from 'prop-types';
import { propTypesConstants } from '@shared/constants';
import { childrenPropTypes } from '../childrenPropTypes';

const listTypesArray = Object.values(propTypesConstants.LIST_TYPES);

export const listPropTypes = {
  props: {
    as: oneOf(listTypesArray),
    children: childrenPropTypes.props,
  },
  default: {
    as: propTypesConstants.LIST_TYPES.UNORDERED,
    children: childrenPropTypes.default,
  },
};
