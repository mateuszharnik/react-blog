import { memo, useMemo } from 'react';
import { tableContextElementsPropTypes } from '@client/prop-types/tableContextElementsPropTypes';
import Text from '@client/components/Tables/TableText';

const TableText = memo(({ header, cell, footer }) => {
  const restProps = useMemo(() => {
    if (header) {
      return {
        text: header.column.columnDef.header,
        context: header.getContext(),
      };
    }

    if (cell) {
      return {
        text: cell.column.columnDef.cell,
        context: cell.getContext(),
      };
    }

    if (footer) {
      return {
        text: footer.column.columnDef.footer,
        context: footer.getContext(),
      };
    }

    return null;
  }, [header, cell, footer]);

  return restProps ? <Text {...restProps} /> : null;
});

TableText.displayName = 'TableText';

TableText.propTypes = tableContextElementsPropTypes.props;

TableText.defaultProps = tableContextElementsPropTypes.default;

export default TableText;
