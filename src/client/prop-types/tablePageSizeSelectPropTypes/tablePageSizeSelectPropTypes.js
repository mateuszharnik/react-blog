import { func, oneOf } from 'prop-types';
import { tableConstants } from '@shared/constants';

const pageSizes = Object.values(tableConstants.TABLE_PAGE_SIZES);

export const tablePageSizeSelectPropTypes = {
  props: {
    pageSize: oneOf(pageSizes).isRequired,
    pageSizeChange: func.isRequired,
  },
};
