import { string, oneOf } from 'prop-types';
import { propTypesConstants } from '@shared/constants';
import { childrenPropTypes } from '../childrenPropTypes';

const labelTypesArray = Object.values(propTypesConstants.LABEL_TYPES);

export const formLabelPropTypes = {
  props: {
    className: string,
    type: oneOf(labelTypesArray),
    children: childrenPropTypes.props,
  },
  default: {
    className: '',
    type: propTypesConstants.LABEL_TYPES.INPUT,
    children: childrenPropTypes.default,
  },
};
