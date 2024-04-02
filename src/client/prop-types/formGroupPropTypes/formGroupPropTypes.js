import { oneOf, string } from 'prop-types';
import { propTypesConstants } from '@shared/constants';
import { childrenPropTypes } from '../childrenPropTypes';

const formGroupTypesArray = Object.values(propTypesConstants.FORM_GROUP_TYPES);

export const formGroupPropTypes = {
  props: {
    className: string,
    type: oneOf(formGroupTypesArray),
    children: childrenPropTypes.props,
  },
  default: {
    className: '',
    type: propTypesConstants.FORM_GROUP_TYPES.INPUT,
    children: childrenPropTypes.default,
  },
};
