import { memo, forwardRef } from 'react';
import { useTableContext } from '@client/contexts/TableContext';
import Pagination from '@client/components/Tables/TablePagination';

const TablePagination = memo(forwardRef((props, tablePaginationRef) => {
  const { table } = useTableContext();

  return (
    <Pagination
      ref={tablePaginationRef}
      setPageIndex={table.setPageIndex}
      getPageCount={table.getPageCount}
      previousPage={table.previousPage}
      nextPage={table.nextPage}
      getCanPreviousPage={table.getCanPreviousPage}
      getCanNextPage={table.getCanNextPage}
      {...props}
    />
  );
}));

TablePagination.displayName = 'TablePagination';

export default TablePagination;
