import { memo, createContext, useMemo } from 'react';
import { tableContextPropTypes } from '@client/prop-types/tableContextPropTypes';
import Table from '@client/components/Tables/Table';

export const Context = createContext();

const TableContext = memo(({ table, children, ...restProps }) => {
  const context = useMemo(() => ({
    table,
  }), [table]);

  return (
    <Context.Provider value={context}>
      <Table {...restProps}>
        {children}
      </Table>
    </Context.Provider>
  );
});

TableContext.displayName = 'TableContext';

TableContext.propTypes = tableContextPropTypes.props;

TableContext.defaultProps = tableContextPropTypes.default;

export default TableContext;
