import {
  memo, useCallback, forwardRef, Fragment,
} from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useTableContext } from '@client/contexts/TableContext';
import { childrenPropTypes } from '@client/prop-types/childrenPropTypes';
import Body from '@client/components/Tables/TableBody';

const TableBody = memo(forwardRef(({
  children,
  ...restProps
}, tableBodyRef) => {
  const { table } = useTableContext();

  const mappedCells = useCallback((cells) => ({
    id: uuidv4(),
    ...cells.reduce((acc, next) => {
      acc[next.id.split('_')[1]] = next;

      return acc;
    }, {}),
  }), []);

  return (
    <Body
      ref={tableBodyRef}
      {...restProps}
    >
      {table.getRowModel().rows.map((row) => (
        <Fragment key={row.id}>
          {children({
            cell: mappedCells(row.getVisibleCells()),
            cells: row.getVisibleCells(),
          })}
        </Fragment>
      ))}
    </Body>
  );
}));

TableBody.displayName = 'TableBody';

TableBody.propTypes = {
  children: childrenPropTypes.props,
};

TableBody.defaultProps = {
  children: childrenPropTypes.default,
};

export default TableBody;
