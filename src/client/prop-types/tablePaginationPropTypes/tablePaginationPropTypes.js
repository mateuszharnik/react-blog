import { func } from 'prop-types';

export const tablePaginationPropTypes = {
  props: {
    setPageIndex: func.isRequired,
    getPageCount: func.isRequired,
    previousPage: func.isRequired,
    nextPage: func.isRequired,
    getCanPreviousPage: func.isRequired,
    getCanNextPage: func.isRequired,
  },
};
