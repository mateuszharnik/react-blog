import { memo, forwardRef } from 'react';
import { tableSearchPropTypes } from '@client/prop-types/tableSearchPropTypes';

const TableSearch = memo(forwardRef(({
  globalFilter,
  setGlobalFilters,
  ...restProps
}, tableSearchRef) => (
  <input
    ref={tableSearchRef}
    type="text"
    value={globalFilter}
    {...restProps}
    onChange={setGlobalFilters}
  />
)));

TableSearch.displayName = 'TableSearch';

TableSearch.propTypes = tableSearchPropTypes.props;

export default TableSearch;
