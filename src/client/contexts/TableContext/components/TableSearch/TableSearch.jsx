import { forwardRef } from 'react';
import { useTableContext } from '@client/contexts/TableContext';
import Search from '@client/components/Tables/TableSearch';

const TableSearch = forwardRef((props, tableSearchRef) => {
  const { table } = useTableContext();

  return (
    <Search
      ref={tableSearchRef}
      setGlobalFilters={table.setGlobalFilters}
      globalFilter={table.globalFilter}
      {...props}
    />
  );
});

TableSearch.displayName = 'TableSearch';

export default TableSearch;
