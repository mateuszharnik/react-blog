import { memo } from 'react';
import { tablePropTypes } from '@client/prop-types/tablePropTypes';
import Box from '@client/components/Box';

const Table = memo(({ rows, children, ...restProps }) => (
  <Box className="border rounded-2 overflow-hidden my-2">
    <Box
      className="table-responsive"
      {...restProps}
    >
      {children}
    </Box>
  </Box>
));

Table.displayName = 'Table';

Table.propTypes = tablePropTypes.props;

Table.defaultProps = tablePropTypes.default;

export default Table;
