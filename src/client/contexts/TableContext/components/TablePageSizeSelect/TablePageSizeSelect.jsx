import { memo, forwardRef } from 'react';
import { useTableContext } from '@client/contexts/TableContext';
import PageSizeSelect from '@client/components/Tables/TablePageSizeSelect';

const TablePageSizeSelect = memo(forwardRef((props, tablePageSizeSelectRef) => {
  const { table } = useTableContext();

  return (
    <PageSizeSelect
      ref={tablePageSizeSelectRef}
      pageSize={table.getState().pagination.pageSize}
      pageSizeChange={table.handlePageSizeChange}
      {...props}
    />
  );
}));

TablePageSizeSelect.displayName = 'TablePageSizeSelect';

export default TablePageSizeSelect;
