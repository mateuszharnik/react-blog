import { oneOf } from 'prop-types';
import { propTypesConstants } from '@shared/constants';
import { childrenPropTypes } from '../childrenPropTypes';

const boxTypesArray = Object.values(propTypesConstants.BOX_TYPES);

export const boxPropTypes = {
  props: {
    as: oneOf(boxTypesArray),
    children: childrenPropTypes.props,
  },
  default: {
    as: propTypesConstants.BOX_TYPES.DIV,
    children: childrenPropTypes.default,
  },
};
