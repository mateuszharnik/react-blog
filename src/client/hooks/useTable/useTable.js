import { useCallback, useState, useMemo } from 'react';
import {
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { tableConstants } from '@shared/constants';

const pageSizes = Object.values(tableConstants.TABLE_PAGE_SIZES);

const useTable = ({ data, columns, pageSize = 10 }) => {
  const [sorting, setSorting] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState({});
  const [columnOrder, setColumnOrder] = useState([]);
  const [globalFilter, setGlobalFilter] = useState('');

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnVisibility,
      columnOrder,
      globalFilter,
    },
    initialState: { pagination: { pageSize } },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    onColumnVisibilityChange: setColumnVisibility,
    onColumnOrderChange: setColumnOrder,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  const setGlobalFilters = useCallback((event) => {
    setGlobalFilter(String(event.target.value));
  }, []);

  const handlePageSizeChange = useCallback((event) => {
    table.setPageSize(Number(event.target.value));
  }, [table]);

  const counter = useMemo(() => {
    const { pagination } = table.getState();
    const { rows = [] } = table.getRowModel();
    const { rows: filteredRows = [] } = table.getFilteredRowModel();
    const { pageSize: paginationPageSize, pageIndex } = pagination;

    if (!filteredRows.length) return '0';

    if (paginationPageSize === 1) return `${pageIndex + 1} z ${filteredRows.length}`;

    const firstIndex = paginationPageSize * pageIndex + 1;
    const lastIndex = pageIndex ? paginationPageSize * pageIndex + rows.length : rows.length;

    let result = pageIndex ? `${firstIndex}` : '1';

    if (firstIndex !== filteredRows.length) {
      result += `-${lastIndex}`;
    }

    return `${result} z ${filteredRows.length}`;
  }, [table.getState(), table.getRowModel(), table.getFilteredRowModel()]);

  const isEmptyState = useMemo(() => !table.getRowModel().rows?.length, [table.getRowModel()]);

  return {
    ...table,
    counter,
    handlePageSizeChange,
    setGlobalFilters,
    globalFilter,
    pageSizes,
    isEmptyState,
  };
};

export default useTable;
