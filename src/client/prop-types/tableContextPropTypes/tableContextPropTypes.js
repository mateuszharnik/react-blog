import { shape } from 'prop-types';
import { childrenPropTypes } from '../childrenPropTypes';

export const tableContextPropTypes = {
  props: {
    table: shape({}).isRequired,
    children: childrenPropTypes.props,
  },
  default: {
    children: childrenPropTypes.default,
  },
};
