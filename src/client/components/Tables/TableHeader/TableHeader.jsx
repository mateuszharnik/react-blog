import { memo, useMemo, forwardRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getTableSortIcon } from '@client/utils/tableUtils';
import { tableHeaderPropTypes } from '@client/prop-types/tableHeaderPropTypes';
import Box from '@client/components/Box';

const TableHeader = memo(forwardRef(({
  isPlaceholder,
  getCanSort,
  getIsSorted,
  getToggleSortingHandler,
  children,
  ...restProps
}, tableHeaderRef) => {
  const sortingEnabled = useMemo(() => !isPlaceholder && getCanSort(), [isPlaceholder, getCanSort]);

  return (
    <th
      ref={tableHeaderRef}
      {...restProps}
      onClick={getToggleSortingHandler()}
    >
      {sortingEnabled ? (
        <Box className="d-flex align-items-center">
          <Box
            as="span"
            className="me-2"
          >
            {children}
          </Box>
          <FontAwesomeIcon icon={getTableSortIcon(getIsSorted())} />
        </Box>
      ) : children}
    </th>
  );
}));

TableHeader.displayName = 'TableHeader';

TableHeader.propTypes = tableHeaderPropTypes.props;

TableHeader.defaultProps = tableHeaderPropTypes.default;

export default TableHeader;
