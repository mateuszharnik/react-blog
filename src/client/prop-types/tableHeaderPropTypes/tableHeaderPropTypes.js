import { func, bool } from 'prop-types';
import { childrenPropTypes } from '../childrenPropTypes';

export const tableHeaderPropTypes = {
  props: {
    isPlaceholder: bool,
    getToggleSortingHandler: func,
    getCanSort: func,
    getIsSorted: func,
    children: childrenPropTypes.props,
  },
  default: {
    isPlaceholder: false,
    getToggleSortingHandler: () => {},
    getCanSort: () => {},
    getIsSorted: () => {},
    children: childrenPropTypes.default,
  },
};
