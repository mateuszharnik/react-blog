import { memo, forwardRef } from 'react';
import { tablePaginationPropTypes } from '@client/prop-types/tablePaginationPropTypes';

const TablePagination = memo(forwardRef(({
  setPageIndex,
  getPageCount,
  previousPage,
  nextPage,
  getCanPreviousPage,
  getCanNextPage,
  ...restProps
}, tablePaginationRef) => (
  <nav
    ref={tablePaginationRef}
    {...restProps}
  >
    <ul className="pagination">
      <li className="page-item">
        <button
          className="page-link"
          type="button"
          disabled={!getCanPreviousPage()}
          onClick={() => setPageIndex(0)}
        >
          First
        </button>
      </li>
      <li className="page-item">
        <button
          className="page-link"
          type="button"
          disabled={!getCanPreviousPage()}
          onClick={() => previousPage()}
        >
          Previous
        </button>
      </li>
      <li className="page-item">
        <button
          className="page-link"
          type="button"
          disabled={!getCanNextPage()}
          onClick={() => nextPage()}
        >
          Next
        </button>
      </li>
      <li className="page-item">
        <button
          className="page-link"
          type="button"
          disabled={!getCanNextPage()}
          onClick={() => setPageIndex(getPageCount() - 1)}
        >
          Last
        </button>
      </li>
    </ul>
  </nav>
)));

TablePagination.displayName = 'TablePagination';

TablePagination.propTypes = tablePaginationPropTypes.props;

export default TablePagination;
