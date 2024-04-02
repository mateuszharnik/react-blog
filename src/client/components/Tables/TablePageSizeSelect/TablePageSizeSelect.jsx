import { memo, forwardRef } from 'react';
import { tablePageSizeSelectPropTypes } from '@client/prop-types/tablePageSizeSelectPropTypes';
import { tableConstants } from '@shared/constants';

const pageSizes = Object.values(tableConstants.TABLE_PAGE_SIZES);

const TablePageSizeSelect = memo(forwardRef(({
  pageSize,
  pageSizeChange,
  ...restProps
}, tablePageSizeSelectRef) => (
  <select
    ref={tablePageSizeSelectRef}
    value={pageSize}
    {...restProps}
    onChange={pageSizeChange}
  >
    {pageSizes.map((size) => (
      <option
        key={size}
        value={size}
      >
        Show {size}
      </option>
    ))}
  </select>
)));

TablePageSizeSelect.displayName = 'TablePageSizeSelect';

TablePageSizeSelect.propTypes = tablePageSizeSelectPropTypes.props;

TablePageSizeSelect.defaultProps = tablePageSizeSelectPropTypes.default;

export default TablePageSizeSelect;
