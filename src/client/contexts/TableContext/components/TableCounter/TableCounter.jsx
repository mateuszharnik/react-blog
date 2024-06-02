import { memo, forwardRef } from 'react';
import isFunction from 'lodash/isFunction';
import { useTableContext } from '@client/contexts/TableContext';
import { childrenPropTypes } from '@client/prop-types/childrenPropTypes';
import Counter from '@client/components/Tables/TableCounter';

const TableCounter = memo(forwardRef(({
  children,
  ...restProps
}, tableCounterRef) => {
  const { table } = useTableContext();

  return (
    <Counter
      ref={tableCounterRef}
      {...restProps}
    >
      {isFunction(children) ? children(table.counter) : (children || table.counter)}
    </Counter>
  );
}));

TableCounter.displayName = 'TableCounter';

TableCounter.propTypes = {
  children: childrenPropTypes.props,
};

TableCounter.defaultProps = {
  children: childrenPropTypes.default,
};

export default TableCounter;
