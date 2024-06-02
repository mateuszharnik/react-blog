import {
  oneOfType, shape, func, string, bool,
} from 'prop-types';

export const tableContextElementsPropTypes = {
  props: {
    header: shape({
      isPlaceholder: bool.isRequired,
      getContext: func.isRequired,
      column: shape({
        getToggleSortingHandler: func.isRequired,
        getCanSort: func.isRequired,
        getIsSorted: func.isRequired,
        columnDef: shape({
          header: oneOfType([string, func]).isRequired,
        }).isRequired,
      }).isRequired,
    }),
    cell: shape({
      getContext: func.isRequired,
      column: shape({
        columnDef: shape({
          cell: oneOfType([string, func]).isRequired,
        }).isRequired,
      }).isRequired,
    }),
    footer: shape({
      isPlaceholder: bool.isRequired,
      getContext: func.isRequired,
      column: shape({
        getToggleSortingHandler: func.isRequired,
        getCanSort: func.isRequired,
        getIsSorted: func.isRequired,
        columnDef: shape({
          footer: oneOfType([string, func]).isRequired,
        }).isRequired,
      }).isRequired,
    }),
  },
  default: {
    header: null,
    cell: null,
    footer: null,
  },
};
