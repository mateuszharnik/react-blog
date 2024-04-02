import { func, string } from 'prop-types';

export const tableSearchPropTypes = {
  props: {
    globalFilter: string.isRequired,
    setGlobalFilters: func.isRequired,
  },
};
